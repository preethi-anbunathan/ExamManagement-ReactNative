import React, {Component} from 'react'
import {View, Alert, ScrollView} from 'react-native'
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
    const {navigation} = this.props;
    this.state.lessonId = navigation.getParam("lessonId")
      this.findAllExamsForLesson(this.state.lessonId);
  }
    componentWillReceiveProps(newProps){
        const {navigation} = this.props;
        this.state.lessonId = navigation.getParam("lessonId")
        this.findAllExamsForLesson(this.state.lessonId);
    }

    findAllExamsForLesson(lessonId) {
        this.examService
            .findAllExamsForLesson(lessonId)
            .then((widgets) => {this.setExams(widgets)});
    }

    setExams(widgets) {
        this.updateForm({widgets: widgets})
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
                this.props.navigation.navigate
                ("ExamList",{lessonId:this.state.lessonId});
            })
    }

    deleteExam(widgetId) {
            this.examService
                .deleteExam(widgetId)
                .then(() => {
                    this.props.navigation.navigate
                    ("ExamList",{lessonId:this.state.lessonId});
                });

    }



    render() {
    return(
      <ScrollView style={{padding: 15}}>
          {this.state.widgets.map(
              (widget, index) => (
                  <ListItem

                      onPress={() => this.props.navigation
                          .navigate("QuestionList", {examId: widget.id})}
                      key={index}
                      subtitle={widget.description}
                      title={widget.title}
                      rightIcon={<Icon
                        reverse
                        name='trash'
                        color='red'
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
                         onPress={this.createExam}
                         />
              <Text/>
              <Text/>
              <Divider
                  style={{
                      backgroundColor:
                          'black' }} />
              <Text h4>Preview</Text>

              <Text h4>{this.state.title}</Text>
              <Text>{this.state.description}</Text>
          </View>
      </ScrollView>
    )
  }
}
export default ExamList