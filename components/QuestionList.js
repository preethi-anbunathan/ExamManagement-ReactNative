import React, {Component} from 'react'
import {View,ScrollView, Alert} from 'react-native'
import {Text, ListItem} from 'react-native-elements'
// import EssayQuestionViewer from '../elements/EssayQuestionViewer'
// import MultipleChoiceQuestionViewer from '../elements/MultipleChoiceQuestionViewer'
// import TrueFalseQuestionViewer from '../elements/TrueFalseQuestionViewer'
// import FillInTheBlanksViewer from '../elements/FillInTheBlanksViewer'

const questionList = [
    { title: 'Question 1', subtitle: 'Multiple choice',
        icon: 'list', type:'MultipleChoice'},
    { title: 'Question 2', subtitle: 'Fill-in the blanks',
        icon: 'code', type:'FillInTheBlanks'},
    { title: 'Question 3', subtitle: 'True or false',
        icon: 'check', type: 'TrueFalse'},
    { title: 'Question 4', subtitle: 'Essay',
        icon: 'subject', type:'Essay'}]

class QuestionList extends Component {
  static navigationOptions = {title: 'Questions'}
  constructor(props) {
    super(props)
    this.state = {
      questions: [],
      examId: 1
    }
  }
    componentWillReceiveProps(newProps){
        console.log('In component will receive props');
        const {navigation} = newProps;
        this.state.examId = navigation.getParam("examId")
        console.log("In ques:"+this.state.examId)
        fetch("http://10.0.3.2:8080/api/exam/"+this.state.examId+"/question")
            .then(response => (response.json()))
            .then(questions => this.setState({questions}))
    }

  componentDidMount() {
    const {navigation} = this.props;
    this.state.examId = navigation.getParam("examId")
      console.log("In ques:"+this.state.examId)
    fetch("http://10.0.3.2:8080/api/exam/"+this.state.examId+"/question")
      .then(response => (response.json()))
      .then(questions => this.setState({questions}))
  }
  render() {
    return(
      <ScrollView style={{padding: 15}}>
      {this.state.questions.map(
        (question, index) => (
          <ListItem
            onPress={() => {
              if(question.type === "truefalse")
                this.props.navigation
                  .navigate("TrueFalseQuestionViewer", {questionId: question.id, examId: this.state.examId})
              if(question.type === "multi")
                this.props.navigation
                  .navigate("MultipleChoiceQuestionViewer", {questionId: question.id, examId: this.state.examId})
                if(question.type === "essay")
                    this.props.navigation
                        .navigate("EssayQuestionViewer", {questionId: question.id, examId: this.state.examId})
                if(question.type === "blanks")
                    this.props.navigation
                        .navigate("FillInTheBlanksViewer", {questionId: question.id, examId: this.state.examId})
            }}
            key={index}
            subtitle={question.desciption}
            title={question.title}/>))}

          <View style={{padding:15}}>
              <Text h4>Please select Question Type to Add</Text>
              {questionList.map((question,index) =>(
                      <ListItem
                          onPress={() => {
                            if(question.type === "TrueFalse")
                              this.props.navigation
                                .navigate("TrueFalseQuestionEditor", {examId: this.state.examId,lessonId:this.state.lessonId})
                            if(question.type === "MultipleChoice")
                              this.props.navigation
                                .navigate("MultipleChoiceQuestionEditor", {examId: this.state.examId,lessonId:this.state.lessonId})
                              if(question.type === "Essay")
                                  this.props.navigation
                                      .navigate("EssayQuestionEditor", {examId: this.state.examId,lessonId:this.state.lessonId})
                              if(question.type === "FillInTheBlanks")
                                  this.props.navigation
                                      .navigate("FillInTheBlanksEditor", {examId: this.state.examId,lessonId:this.state.lessonId})
                          }}

                          key={index} title={question.title} subtitle={question.subtitle} leftIcon={{name: question.icon}}  />
                  )

              )}
          </View>
      </ScrollView>
    )
  }
}


export default QuestionList