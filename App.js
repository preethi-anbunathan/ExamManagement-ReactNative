import React from 'react';
import { StyleSheet, View, StatusBar, ScrollView } from 'react-native';
import {Divider} from 'react-native-elements'
import {Text} from 'react-native-elements'
import FixedHeader from './elements/FixedHeader'
import TextHeadings from './elements/TextHeadings'
import Icons from './elements/Icons'
import Exam from './elements/Exam'
import {Button} from 'react-native-elements'
import QuestionTypeChooser from './elements/QuestionTypeButtonGroupChooser'
import QuestionTypePicker from './elements/QuestionTypePicker'
import TrueFalseQuestionEditor from './elements/TrueFalseQuestionEditor'
import EssayQuestionEditor from './elements/EssayQuestionEditor'
import { createStackNavigator } from 'react-navigation'
import CourseList from './components/CourseList'
import LessonList from './components/LessonList'
import ModuleList from './components/ModuleList'
import QuestionList from './components/QuestionList'
import ExamList from './components/ExamList'
import ExamWidgetList from './components/ExamWidgetList'
import MultipleChoiceQuestionEditor from './elements/MultipleChoiceQuestionEditor'
import AssignmentList from './components/AssignmentList'
import FillInTheBlanksEditor from './elements/FillInTheBlanksEditor'
import FillInTheBlanksViewer from './elements/FillInTheBlanksViewer'
import TrueFalseQuestionViewer from './elements/TrueFalseQuestionViewer'
import EssayQuestionViewer from './elements/EssayQuestionViewer'
import MultipleChoiceQuestionViewer from './elements/MultipleChoiceQuestionViewer'
import AssignmentViewer from './elements/AssignmentViewer'


class Home extends React.Component {
    static navigationOptions = {
        title: 'Home'
    }
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <ScrollView>
                <StatusBar barStyle="light-content"/>

                <FixedHeader/>

                <View style={{padding: 15}}>
                    <Button title="Courses"
                            onPress={() => this.props.navigation
                                .navigate('CourseList') } />
                    </View>

            </ScrollView>
        )
    }}


const App = createStackNavigator({
    Home,
    CourseList,
    ModuleList,
    LessonList,
    AssignmentList,
    ExamList,
    ExamWidgetList,
    QuestionList,
    TrueFalseQuestionEditor,
    FillInTheBlanksEditor,
    MultipleChoiceQuestionEditor,
    EssayQuestionEditor,
    AssignmentViewer,
     FillInTheBlanksViewer,
    TrueFalseQuestionViewer,
    EssayQuestionViewer,
     MultipleChoiceQuestionViewer,
});
export default App


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
