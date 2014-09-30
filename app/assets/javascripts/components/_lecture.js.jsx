/** @jsx React.DOM */

var Lecture = React.createClass({
    getInitialState: function () {
        return {class: 'closed'};
    },
    expand: function () {
        if(this.state.class == 'closed') {
            this.setState({class: 'open'});
        } else {
            this.setState({class: 'closed'});
        }

    },
    render: function () {
        return (
            <div className="lecture-container">

                <h5>
                Lecture: <a onClick={this.expand}>{ this.props.name }</a>
                </h5>

                <div className={'lecture ' + this.state.class} id="lecture-<%= lecture.id %>">

                    <p>
                        <a href="#">edit lecture</a>
                        <a href="#">remove lecture</a>
                        <span className="space"></span>
                        <a href="#" className="add secondary slide-reveal">Show Files</a>
                        <span className="space"></span>
                        <a href="#">add video</a>
                    </p>

                    <p>No lecture files yet!</p>
                    <h6>Lecture Files (examples: presentations, homework, etc)</h6>

                    <a href="#">Render Documents here</a>

                    <h5><a href="#">Render Documents here</a></h5>

                    <div className="lecture-videos">
                        <div>
                            <h6>lecture videos</h6>
                            <p>Render each video here</p>
                        </div>
                        <p className="grey">There aren't any videos in this lecture yet.</p>
                    </div>

                </div>

            </div>);
            }
            });
