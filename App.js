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
                    <Text h1>Home</Text>
                    <Button title="Courses"
                            onPress={() => this.props.navigation
                                .navigate('CourseList') } />
                    <Button title="Go to Screen A"
                            onPress={() => this.props.navigation
                                .navigate('ScreenA')}/>
                    <Button title="Go to Screen B"
                            onPress={() => this.props.navigation
                                .navigate('ScreenB')}/>
                    <Button title="Go to Screen X"
                            onPress={() => this.props.navigation
                                .navigate('ScreenX',{'parameter':'some value'})}/>
                </View>

                <QuestionTypeChooser/>
                <QuestionTypePicker/>
                <Icons/>
                <TextHeadings/>

                <Exam/>
                {/*<TrueFalseQuestionEditor/>*/}
                {/*<Divider*/}
                    {/*style={{*/}
                        {/*backgroundColor:*/}
                            {/*'blue'*/}
                    {/*}}/>*/}
                {/*<EssayQuestionEditor/>*/}
                {/*<Divider*/}
                    {/*style={{*/}
                        {/*backgroundColor:*/}
                            {/*'blue'*/}
                    {/*}}/>*/}
                {/*<MultipleChoiceQuestionEditor/>*/}
            </ScrollView>
        )
    }}

class ScreenA extends React.Component {
    static navigationOptions = {title: "Screen A"}
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View>
                <Text h1>Screen A</Text>
                <Button title="Go Home"
                        onPress={() =>this.props
                            .navigation
                            .goBack()} />
            </View>
        )
    }
}

class ScreenB extends React.Component {
    static navigationOptions = {title: "Screen B"}
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View>
                <Text h1>Screen B</Text>
                <Button title="Go Home"
                        onPress={() =>this.props
                            .navigation
                            .goBack()} />
            </View>
        )
    }
}

class ScreenX extends React.Component {
    render() {

        const parameter =
            this.props.navigation.getParam
            ('parameter', 'some default value');

        return (
            <View style={{alignItems: 'center'}}>
                <Text h1>Screen {parameter}</Text>
            </View>
        )
    }
}

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
    // FillInTheBlanksViewer,
    TrueFalseQuestionViewer,
    EssayQuestionViewer,
    // MultipleChoiceQuestionViewer,
    ScreenA,
    ScreenB,
    ScreenX
});
export default App

// export default class App extends React.Component {
//   render() {
//     return (
//
//     );
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
