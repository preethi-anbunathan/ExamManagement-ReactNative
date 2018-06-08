import React, {Component} from 'react'
import {View} from 'react-native'
import {Button} from 'react-native-elements'

class ExamWidgetList extends Component {
    static navigationOptions = {title: 'Exam Widgets'};

    constructor(props) {
        super(props);
        this.state = {
            widgets: [],
            courseId: 1,
            moduleId: 1,
            lessonId:1
        }
    }

    componentDidMount() {
        const {navigation} = this.props;
        const lessonId = navigation.getParam("lessonId")
        this.setState({lessonId});
    }

    render() {
        return (
            <View>
                <View style={{paddingHorizontal:5, paddingTop:10}}>
                    <Button buttonStyle={{
                        backgroundColor: "rgba(92, 99,216, 1)",
                        width: 330,
                        height: 70,
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius: 5,
                    }} title="Assignments"
                            onPress={() => this.props.navigation
                                .navigate('AssignmentList', {lessonId: this.state.lessonId})}
                            containerStyle={{marginVertical: 20, marginHorizontal:20}}/>
                </View>
                <View style={{paddingLeft: 5, paddingRight: 5, paddingVertical:5}}>
                    <Button buttonStyle={{
                        backgroundColor: "rgba(92, 99,216, 1)",
                        width: 330,
                        height: 70,
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius: 5,
                    }} title="Exams"
                            onPress={() => this.props.navigation
                                .navigate('ExamList', {lessonId: this.state.lessonId})}
                            containerStyle={{marginVertical: 20}}/>
                </View>
            </View>
        )
    }
}

export default ExamWidgetList