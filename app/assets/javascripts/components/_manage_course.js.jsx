/** @jsx React.DOM */

var CapsuleStruct = function() {

    return {
        name        : '',
        description : '',
        // temporary id generator
        id          : Math.floor(Math.random()*5000000),
        lectures    : []
    };

};

var ManageCourse = React.createClass({

    getInitialState: function () {

        this.props.data.capsules = JSON.parse(this.props.data.capsules);

        // temporary test data
        this.props.data = {
            name: 'Course Name',
            description: 'Course Desc',
            subject: 'Course sub',
            number: 'course number',
            capsules: [
                { name: 'Lesson 1', description: 'Lets learn factoring', id: 5,
                    lectures: [
                        { name: 'Lecture 1', description: 'First lec', id: 65 },
                        { name: 'Lecture 2', description: 'Second lec', id: 66 },
                        { name: 'Lecture 3', description: 'Third lec', id: 67 }
                    ]},
                    { name: 'Lesson 2', description: 'Lets learn factoring', id: 6,
                        lectures: [
                            { name: 'Lecture 1', description: 'First lec', id: 65 },
                            { name: 'Lecture 2', description: 'Second lec', id: 66 },
                            { name: 'Lecture 3', description: 'Third lec', id: 67 }
                        ]},
                        { name: 'Lesson 3', description: 'Lets learn factoring', id: 7,
                            lectures: [
                                { name: 'Lecture 1', description: 'First lec', id: 65 },
                                { name: 'Lecture 2', description: 'Second lec', id: 66 },
                                { name: 'Lecture 3', description: 'Third lec', id: 67 }
                            ]}
            ],
            files: [
                { name: 'sillybus', key: 32 },
                { name: 'hw', key: 332 },
                { name: 'notes', key: 132 }
            ]
        }

        return this.props.data;

    },

    // example AJAX call
    handleCommentSubmit: function ( formData, action ) {

        $.ajax({
            data: formData,
            url: action,
            type: "POST",
            dataType: "json",
            success: function ( data ) {
                this.setState({ capsules: data });
            }.bind(this)
        });

    },

    // add a new empty capsule
    addCapsule: function () {

        var capsules = this.state.capsules;

        var newCapsules = capsules.concat([CapsuleStruct()]);

        this.setState({capsules: newCapsules});

    },

    // remove a capsule, this function is passed to capsuleList and each capsule
    removeCapsule: function (id) {

        var capsules = this.state.capsules;
        var newCapsules = [];
        for(var i=0; i < capsules.length; i++) {
            if(capsules[i].id != id) {
                newCapsules.push(capsules[i]);
            }
        }

        this.setState({capsules: newCapsules});

    },

    // function for removing a file, passed to capsuleList and each capsule
    removeFile: function (id) {

    },

    // toggles the showFiles state
    showFiles: function () {

        if(this.state.showFiles) {
            this.setState({ showFiles: 0 });
        } else {
            this.setState({ showFiles: 1 });
        }

    },

    // toggles editing on and off via 'editing' state
    editCourseInfo: function () {

        if(this.state.editing) {
            this.setState({ editing: 0 });
        } else {
            this.setState({ editing: 1 });
        }

    },

    render: function () {

        // text for 'Show Files' button based on whether files are currently showing
        var showFiles       = this.state.showFiles ? 'Hide Files' : 'Show Files';

        // text for 'Edit Course' button based on whether currently editing
        var editing         = this.state.editing ? 'Done Editing' : 'Edit Course';

        // css class for 'Edit Course' button based on whether currently editing
        var editClass       = this.state.editing? 'button small red' : 'button small green';

        // tempate for editing course information
        var editableInfo    = (
            <div>
                <input ref="courseNumber"
                    onChange={this.updateCourseNumber}
                    placeholder="101"
                    defaultValue={this.state.courseNumber}>
                </input>
                <textarea
                    ref="description"
                    onChange={this.updateDescription}
                    placeholder="Course description goes here"
                    defaultValue={this.state.description}>
                </textarea>
            </div>
        );

        // tempate for displaying course information
        var displayInfo     = (
            <p>{this.state.description}, {this.state.number}</p>
        );

        return (
            <div className="manage">
                <p>

                    <a  onClick={ this.editCourseInfo } className={editClass} >{ editing }</a>
                    <a  className="button alert small">Destroy Course</a>
                    <a  className="button small secondary">Course Announcements</a>
                    <a  onClick={ this.showFiles } className="button small secondary">{showFiles}</a>
                    <a  className="button small secondary">View as Student &#10148;</a>

                </p>

                {this.state.showFiles ? (<FileList removeCapsule={ this.removeFile } files={ this.state.files } />) : null }

                {/* display/edit course info */}
                {this.state.editing? editableInfo : displayInfo }

                <h3>
                    Course Capsules ({ this.state.capsules.length } total)
                    <a onClick={ this.addCapsule } className="add small">Add Capsule</a>
                </h3>

                <p className="grey">Courses are divided into groups of capsules, each of which contain lectures.</p>

                <CapsuleList removeCapsule={ this.removeCapsule } capsules={ this.state.capsules } />

            </div>
        );
    }
});
