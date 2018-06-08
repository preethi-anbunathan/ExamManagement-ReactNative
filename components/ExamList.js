import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem, FormLabel, FormInput, FormValidationMessage, Button, Divider, Icon} from 'react-native-elements'
import ExamService from '../services/ExamService'

class ExamList extends Component {
  static navigationOptions = {title: 'Exam'};
  constructor(props) {
    super(props);
    this.state = {
      widgets: [],
      courseId: 1,
      moduleId: 1,
        title: '',
        description: '',
        widgetType:'Exam',
        text: 'ExamWidget',
        lessonId:1
    };
      this.deleteExam = this.deleteExam.bind(this);
      this.createExam = this.createExam.bind(this);
      this.examService = ExamService.instance;
  }

    updateForm(newState) {
        this.setState(newState)
    }

    setLessonId(lessonId) {
        this.setState({lessonId: lessonId});
    }

  componentDidMount() {
    console.log('In component did mount');
    const {navigation} = this.props;
    this.state.lessonId = navigation.getParam("lessonId")
    // fetch("http://10.0.3.2:8080/api/lesson/"+lessonId+"/examwidget")
    //   .then(response => (response.json()))
    //   .then(widgets => this.setState({widgets}))
      this.findAllExamsForLesson(this.state.lessonId);
  }
    componentWillReceiveProps(newProps){
        console.log('In component will receive props');
        this.setLessonId(newProps.lessonId);
        //this.findAllExamsForLesson(newProps.lessonId)
    }

    findAllExamsForLesson(lessonId) {
    console.log('In find all exams');
        this.examService
            .findAllExamsForLesson(lessonId)
            .then((widgets) => {this.setExams(widgets)});
    }

    setExams(widgets) {
    console.log('In set exams');
        this.setState({widgets: widgets})
    }

    createExam() {
        let newExam;
        newExam={
            title:this.state.title,
            description : this.state.description,
            text : this.state.text,
            widgetType : this.state.widgetType
        }

        this.examService
            .createExam
            (this.state.lessonId,newExam)
            .then(() => {
                this.findAllExamsForLesson
                (this.state.lessonId);
            })
    }

    deleteExam(widgetId) {
            this.examService
                .deleteExam(widgetId)
                .then(() => {
                    this.findAllExamsForLesson
                    (this.state.lessonId)
                });

    }

    render() {
    return(
      <View style={{padding: 15}}>
          {this.state.widgets.map(
              (widget, index) => (
                  <ListItem

                      onPress={() => this.props.navigation
                          .navigate("QuestionList", {examId: widget.id})}
                      key={index}
                      subtitle={widget.description}
                      title={widget.title}
                      // leftIcon={{name:'trash-o'}}
                      leftIcon={<Icon
                        reverse
                        name='trash'
                        type='font-awesome'
                        size={20}
                        onPress={() => this.deleteExam(widget.id)}
                        style={{paddingRight:20}}
                      />}
                  />))}
          <Divider
              style={{
                  backgroundColor:
                      'black'
              }}/>
          <View>
              <Text h4>Add Exam Widget</Text>
              <FormLabel>Title</FormLabel>
              <FormInput onChangeText={
                  text => this.updateForm({title: text})
              }/>
              <FormValidationMessage>
                  Title is required
              </FormValidationMessage>

              <FormLabel>Description</FormLabel>
              <FormInput onChangeText={
                  text => this.updateForm({description: text})
              }/>
              <FormValidationMessage>
                  Description is required
              </FormValidationMessage>

              <Button	buttonStyle={{
                  backgroundColor: 'green',

                  borderColor: "transparent",
                  borderWidth: 0,
                  borderRadius: 5,
              }} title="Add Exam"
                         leftIcon={{name:'check'}}
                         onPress={this.createExam}
                         />
              <Text h4>Preview</Text>
              <Divider
                  style={{
                      backgroundColor:
                          'blue' }} />
              <Text h4>{this.state.title}</Text>
              <Text>{this.state.description}</Text>
          </View>
      </View>
    )
  }
}
export default ExamList