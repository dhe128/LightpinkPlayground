import * as Constants from '@component/Constants'

export const computeSphereCollisions = colliders => (sphere, velocity) => {
  for (let i = 0, length = colliders.length; i < length; i++) {
    const c = colliders[i]

    if (c.sphere) {
      const d2 = sphere.center.distanceToSquared(c.sphere.center)
      const r = sphere.radius + c.sphere.radius
      const r2 = r * r

      if (d2 < r2) {
        const normal = Constants.v1
          .subVectors(sphere.center, c.sphere.center)
          .normalize()
        const impact1 = Constants.v2
          .copy(normal)
          .multiplyScalar(normal.dot(velocity))
        const impact2 = Constants.v3
          .copy(normal)
          .multiplyScalar(normal.dot(c.velocity))
        velocity.add(impact2).sub(impact1)
        c.velocity.add(impact1).sub(impact2)
        const d = (r - Math.sqrt(d2)) / 2
        sphere.center.addScaledVector(normal, d)
        c.sphere.center.addScaledVector(normal, -d)
      }
    } else if (c.capsule) {
      const center = Constants.v1
        .addVectors(c.capsule.start, c.capsule.end)
        .multiplyScalar(0.5)
      const r = sphere.radius + c.capsule.radius
      const r2 = r * r
      for (const point of [c.capsule.start, c.capsule.end, center]) {
        const d2 = point.distanceToSquared(sphere.center)
        if (d2 < r2) {
          const normal = Constants.v1
            .subVectors(point, sphere.center)
            .normalize()
          const impact1 = Constants.v2
            .copy(normal)
            .multiplyScalar(normal.dot(c.velocity))
          const impact2 = Constants.v3
            .copy(normal)
            .multiplyScalar(normal.dot(velocity))
          c.velocity.add(impact2).sub(impact1)
          velocity.add(impact1).sub(impact2)
          const d = (r - Math.sqrt(d2)) / 2
          sphere.center.addScaledVector(normal, -d)
        }
      }
    }
  }
}
