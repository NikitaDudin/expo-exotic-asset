import { Asset } from "expo-asset";
import { resolveExoticAsync } from "expo-exotic-asset";
import { ExpoWebGLRenderingContext, GLView } from "expo-gl";
import { Dimensions, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");

const render = (gl: ExpoWebGLRenderingContext, asset: Asset) => {
  const vert = gl.createShader(gl.VERTEX_SHADER)!;
  gl.shaderSource(
    vert,
    `
  precision highp float;
  attribute vec2 position;
  varying vec2 uv;
  void main () {
    uv = position;
    gl_Position = vec4(1.0 - 2.0 * position, 0, 1);
  }`
  );
  gl.compileShader(vert);
  const frag = gl.createShader(gl.FRAGMENT_SHADER)!;
  gl.shaderSource(
    frag,
    `
  precision highp float;
  uniform sampler2D texture;
  varying vec2 uv;
  void main () {
    gl_FragColor = texture2D(texture, vec2(uv.x, uv.y));
  }`
  );
  gl.compileShader(frag);

  const program = gl.createProgram()!;
  gl.attachShader(program, vert);
  gl.attachShader(program, frag);
  gl.linkProgram(program);
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  const verts = new Float32Array([-2, 0, 0, -2, 2, 2]);
  gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);

  const positionAttrib = gl.getAttribLocation(program, "position");
  gl.enableVertexAttribArray(positionAttrib);
  gl.vertexAttribPointer(positionAttrib, 2, gl.FLOAT, false, 0, 0);

  const texture = gl.createTexture();
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    asset as any
  );
  gl.uniform1i(gl.getUniformLocation(program, "texture"), 0);
  gl.clearColor(0, 0, 1, 1);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, verts.length / 2);
  gl.endFrameEXP();
};

const withAssets = async (gl: ExpoWebGLRenderingContext) => {
  // Not works in Android release build
  const asset = Asset.fromModule(require("./assets/wall.jpeg"));
  await asset.downloadAsync();

  render(gl, asset);
};

const withExoticAssets = async (gl: ExpoWebGLRenderingContext) => {
  // Fine works in Android release build
  const asset = await resolveExoticAsync(require("./assets/wall.jpeg.extc"));

  render(gl, asset!);
};

const MODE = __DEV__? "DEBUG" : "RELEASE";
const DESC = `${__DEV__ ? 'Fine' : 'Not'} works in ${MODE} mode`;

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <GLView style={styles.glView} onContextCreate={withAssets}></GLView>
        <Text style={styles.text}>Expo asset: {DESC}</Text>
      </View>
      <View style={styles.item}>
        <GLView style={styles.glView} onContextCreate={withExoticAssets} />
        <Text style={styles.text}>Exotic asset: Fine works in {MODE} mode</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    margin: 4,
  },
  glView: {
    width: width * 0.8,
    height: width * 0.8,
    borderWidth: 2,
    borderColor: "#08f",
  },
  text: {
    position: "absolute",
    top: 14,
    left: 8,
    fontSize: 12,
    padding: 8,
    color: "#000",
    backgroundColor: '#ffffffd0'
  },
});
