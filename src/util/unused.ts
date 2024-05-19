/*

export const placeMeshInScene = (
  mesh: Mesh,
  position: Vector3 = new Vector3(),
  size?: Vector3,
) => {
  const {
    refs: {meshGroup},
  } = useLightpinkStore.getState()
  mesh.position.copy(position)

  if (size) {
    const {geometry} = mesh
    geometry.computeBoundingBox()
    mesh.scale.multiply(size).divide(geometry.boundingBox.max)
  }
  meshGroup.add(mesh)
}
*/
