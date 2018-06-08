import React, {Component} from 'react'
import { View, Alert} from 'react-native'
import {ListItem, Text} from 'react-native-elements'

const questions = [
    { title: 'Question 1', subtitle: 'Multiple choice',
        icon: 'list'},
    { title: 'Question 2', subtitle: 'Fill-in the blanks',
        icon: 'code'},
    { title: 'Question 3', subtitle: 'True or false',
        icon: 'check'},
    { title: 'Question 4', subtitle: 'Essay',
        icon: 'subject'}]

export default class Exam extends React.Component {
    render() {
        return (
            <View style={{padding:15}}>
                <Text h2>Lists</Text>
                {questions.map((question,index) =>(
                    <ListItem key={index} title={question.title} subtitle={question.subtitle}   />
                    )

                )}
            </View>
        )
    }
}