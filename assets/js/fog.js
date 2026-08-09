// Fullscreen WebGL fragment shader — atmospheric drifting cloud fog.
// Cursor displaces the mist (parts around the pointer).
// Dark-mode only. Respects reduced-motion. Zero dependencies.

(function () {
  const REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const canvas = document.createElement('canvas');
  canvas.className = 'fog-canvas';
  canvas.setAttribute('aria-hidden', 'true');

  const gl = canvas.getContext('webgl', {
    antialias: false,
    depth: false,
    stencil: false,
    alpha: false,
    powerPreference: 'low-power'
  });

  if (!gl) return;
  document.body.prepend(canvas);

  const vertSrc = `
    attribute vec2 aPos;
    void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
  `;

  const fragSrc = `
    precision highp float;
    uniform float uTime;
    uniform vec2  uResolution;
    uniform vec2  uMouse;
    uniform float uMouseActive;

    // Simplex noise (Stefan Gustavson — public domain)
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                         -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy));
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m; m = m*m;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / uResolution.xy;
      float aspect = uResolution.x / uResolution.y;
      vec2 p = vec2(uv.x * aspect, uv.y);

      // Cursor displacement — mist parts around the pointer
      vec2 mouseUv = vec2(uMouse.x * aspect, uMouse.y);
      vec2 delta = p - mouseUv;
      float md = length(delta);
      float influence = smoothstep(0.35, 0.0, md) * uMouseActive * 0.20;
      p += normalize(delta + 0.0001) * influence;

      // Layered simplex noise for cloud volume — noticeable drift
      vec2 t = vec2(uTime * 0.055, uTime * 0.038);
      float n = 0.0;
      float amp = 0.5;
      float freq = 1.5;
      for (int i = 0; i < 4; i++) {
        n += snoise(p * freq + t * float(i + 1)) * amp;
        amp *= 0.52;
        freq *= 2.05;
      }
      n = smoothstep(-0.28, 0.60, n);

      // Dark palette — deep near-black bg, cool cyan-tinted mist
      vec3 darkBg     = vec3(0.023, 0.035, 0.058);
      vec3 darkMist   = vec3(0.11, 0.18, 0.28);
      vec3 darkAccent = vec3(0.13, 0.82, 0.93);
      vec3 col = mix(darkBg, darkMist, n);
      col = mix(col, darkAccent, smoothstep(0.75, 1.0, n) * 0.08);

      // Vignette
      float vig = smoothstep(1.20, 0.35, distance(uv, vec2(0.5)));
      col *= mix(0.72, 1.0, vig);

      gl_FragColor = vec4(col, 1.0);
    }
  `;

  function compile(type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.warn('fog shader compile failed:', gl.getShaderInfoLog(s));
      return null;
    }
    return s;
  }

  const vert = compile(gl.VERTEX_SHADER, vertSrc);
  const frag = compile(gl.FRAGMENT_SHADER, fragSrc);
  if (!vert || !frag) return;

  const prog = gl.createProgram();
  gl.attachShader(prog, vert);
  gl.attachShader(prog, frag);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.warn('fog program link failed:', gl.getProgramInfoLog(prog));
    return;
  }
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(prog, 'aPos');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const uTime   = gl.getUniformLocation(prog, 'uTime');
  const uRes    = gl.getUniformLocation(prog, 'uResolution');
  const uMouse  = gl.getUniformLocation(prog, 'uMouse');
  const uMouseA = gl.getUniformLocation(prog, 'uMouseActive');

  const mouse  = { x: 0.5, y: 0.5, active: 0.0 };
  const target = { mx: 0.5, my: 0.5, ma: 0.0 };

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const w = Math.floor(window.innerWidth * dpr);
    const h = Math.floor(window.innerHeight * dpr);
    if (canvas.width !== w) canvas.width = w;
    if (canvas.height !== h) canvas.height = h;
    canvas.style.width  = window.innerWidth  + 'px';
    canvas.style.height = window.innerHeight + 'px';
    gl.viewport(0, 0, w, h);
    gl.uniform2f(uRes, w, h);
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  window.addEventListener('mousemove', (e) => {
    target.mx = e.clientX / window.innerWidth;
    target.my = 1.0 - (e.clientY / window.innerHeight);
    target.ma = 1.0;
  }, { passive: true });
  window.addEventListener('mouseout', (e) => {
    if (e.relatedTarget == null) target.ma = 0.0;
  });

  const start = performance.now();
  let running = true;

  function frame(now) {
    if (!running) return;
    const t = (now - start) / 1000;

    mouse.x      += (target.mx - mouse.x)      * 0.08;
    mouse.y      += (target.my - mouse.y)      * 0.08;
    mouse.active += (target.ma - mouse.active) * 0.05;

    gl.uniform1f(uTime, t);
    gl.uniform2f(uMouse, mouse.x, mouse.y);
    gl.uniform1f(uMouseA, mouse.active);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    if (REDUCED) { running = false; return; }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { running = false; }
    else if (!REDUCED)   { running = true; requestAnimationFrame(frame); }
  });
})();
