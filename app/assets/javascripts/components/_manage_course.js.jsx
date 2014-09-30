/** @jsx React.DOM */

var ManageCourse = React.createClass({

    getInitialState: function () {
        this.props.data.capsules = JSON.parse(this.props.data.capsules);
        this.props.data = {
            capsules: [
                { name: 'Lesson 1', description: 'Lets learn factoring', key: 5,
                    lectures: [
                        { name: 'Lecture 1', description: 'First lec', key: 65 },
                        { name: 'Lecture 2', description: 'Second lec', key: 66 },
                        { name: 'Lecture 3', description: 'Third lec', key: 67 }
                    ]},
                { name: 'Lesson 2', description: 'Lets learn factoring', key: 5,
                    lectures: [
                        { name: 'Lecture 1', description: 'First lec', key: 65 },
                        { name: 'Lecture 2', description: 'Second lec', key: 66 },
                        { name: 'Lecture 3', description: 'Third lec', key: 67 }
                    ]},
                { name: 'Lesson 3', description: 'Lets learn factoring', key: 5,
                    lectures: [
                        { name: 'Lecture 1', description: 'First lec', key: 65 },
                        { name: 'Lecture 2', description: 'Second lec', key: 66 },
                        { name: 'Lecture 3', description: 'Third lec', key: 67 }
                    ]}
            ]
        }
        console.log(this.props.data);
        return this.props.data;
    },

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

    render: function () {
        return (
            <div className="manage">
            <p>

            <a href="https://google.com" target="_blank" className="button small">Edit Course</a>
            <a href="https://google.com" target="_blank" className="button alert small">Destroy Course</a>
            <a href="https://google.com" target="_blank" className="button small secondary">Course Announcements</a>
            <a href="https://google.com" className="button small secondary">Show Files</a>
            <a href="https://google.com" target="_blank" className="button small secondary">View as Student &#10148;</a>

            </p>

            <div id="course-files" className="panel">

                <p>No course files yet!</p>
                <h6>Course-Level Files (examples: syllabus, forms, etc)</h6>

            <h5><a href="https://google.com" target="_blank" className=""></a></h5>

            </div>

            <h3>
            Course Capsules ({ this.state.capsules.length } total)
            <a href="https://google.com" target="_blank" className="add"></a>
            </h3>

            <p className="grey">Courses are divided into groups of capsules, each of which contain lectures.</p>

            <CapsuleList capsules={ this.state.capsules } />

            </div>
        );
    }
});
