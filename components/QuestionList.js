import React, {Component} from 'react'
import {View,ScrollView, Alert} from 'react-native'
import {Text, ListItem} from 'react-native-elements'

const questions = [
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
            // onPress={() => {
            //   if(question.type === "TrueFalse")
            //     this.props.navigation
            //       .navigate("TrueFalseQuestionEditor", {questionId: question.id , examId: this.state.examId})
            //   if(question.type === "MultipleChoice")
            //     this.props.navigation
            //       .navigate("MultipleChoiceQuestionEditor", {questionId: question.id})
            // }}
            key={index}
            subtitle={question.desciption}
            title={question.title}/>))}

          <View style={{padding:15}}>
              <Text h4>Question Types</Text>
              {questions.map((question,index) =>(
                      <ListItem
                          onPress={() => {
                            if(question.type === "TrueFalse")
                              this.props.navigation
                                .navigate("TrueFalseQuestionEditor", {examId: this.state.examId})
                            if(question.type === "MultipleChoice")
                              this.props.navigation
                                .navigate("MultipleChoiceQuestionEditor", {examId: this.state.examId})
                              if(question.type === "Essay")
                                  this.props.navigation
                                      .navigate("EssayQuestionEditor", {examId: this.state.examId})
                              if(question.type === "FillInTheBlanks")
                                  this.props.navigation
                                      .navigate("FillInTheBlanksEditor", {examId: this.state.examId})
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