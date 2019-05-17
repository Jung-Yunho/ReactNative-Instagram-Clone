import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Icon, Container, Content } from 'native-base'

import CardComponent from '../../Components/CardComponent'

export default class HomeTab extends Component {
    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icon name='ios-home' style={{color:tintColor}}/>
        )
    }

    state = {
        feeds: []
    }

    componentWillMount() {
        this._fetchFeeds().then(feeds => {
            this.setState({
                feeds
            })
        })
    }

    _fetchFeeds(){
        const data = {
            id: 1,
            jsonrpc: "2.0",
            method: "call",
            params: [
                "database_api",
                "get_discussions_by_created",
                [{ tag: "kr", limit: 20 }]
            ]
        }
        return fetch('https://api.steemit.com', {
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => res.result)
    }

    render() {
        return (
            <Container style={styles.container}>
                <Content>
                    {
                        this.state.feeds.map(feed => <CardComponent data={feed}/>)
                    }
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})