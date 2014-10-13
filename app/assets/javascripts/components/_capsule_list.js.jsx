/** @jsx React.DOM */

var CapsuleList = React.createClass({
  render: function () {
    var s = this;
    var capsuleNodes = this.props.capsules.map(function ( capsule ) {
      return <Capsule key={ capsule.id } removeCapsule={ s.props.removeCapsule } name={ capsule.name } description={ capsule.description } key={ capsule.id } lectures={ capsule.lectures } />
    });

    return (
      <div className="capsule-list">
        { capsuleNodes }
      </div>
    )
  }
});
