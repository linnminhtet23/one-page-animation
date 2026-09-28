function RigImage({ className = 'rig-part', file, loading }) {
  return (
    <img
      className={className}
      src={`/walking_animation/${file}`}
      alt=""
      loading={loading}
      decoding="async"
    />
  )
}

function RigLeg({ side, loading }) {
  return (
    <div className={`rig-leg rig-leg-${side}`}>
      <span className="rig-calf">
        <span className="rig-shoe">
          <RigImage className="" file="shoe.png" loading={loading} />
        </span>
      </span>
    </div>
  )
}

function RigArm({ side, loading }) {
  return (
    <div className={`rig-part-group rig-arm rig-arm-${side}`}>
      <RigImage file={`${side}_arm.png`} loading={loading} />
      <RigImage file={`${side}_hand.png`} loading={loading} />
    </div>
  )
}

export function WalkingRig({ className = '', loading = 'lazy' }) {
  return (
    <div className={`walking-rig ${className}`.trim()} aria-hidden="true">
      <div className="walking-rig-stage">
        <RigLeg side="left" loading={loading} />
        <RigLeg side="right" loading={loading} />

        <RigImage className="rig-part rig-throat" file="throat.png" loading={loading} />
        <RigImage className="rig-part rig-hair" file="hair.png" loading={loading} />
        <RigImage className="rig-part rig-head" file="head.png" loading={loading} />
        <RigImage className="rig-part rig-body" file="body.png" loading={loading} />

        <div className="rig-part-group rig-head-group">
          <RigImage className="rig-part rig-headphone" file="headphone.png" loading={loading} />
          <RigImage className="rig-part rig-cat" file="cat.png" loading={loading} />
        </div>

        <RigArm side="left" loading={loading} />
        <RigArm side="right" loading={loading} />
      </div>
    </div>
  )
}
