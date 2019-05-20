import React, {Component} from 'react'
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import {Icon, Container, Content, Thumbnail, Header, Left, Right, Body} from 'native-base'

import CardComponent from '../../Components/CardComponent'

export default class HomeTab extends Component {
    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icon name='ios-home' style={{color: tintColor}}/>
        )
    }

    state = {
        feeds: [],
        followings: []
    }

    componentWillMount() {
        this._fetchFeeds().then(feeds => {
            this.setState({
                feeds
            })
        })

        this._fetchFollowing().then(followings => {
            this.setState({
                followings

            })
        })
    }

    _fetchFeeds() {
        const data = {
            id: 1,
            jsonrpc: "2.0",
            method: "call",
            params: [
                "database_api",
                "get_discussions_by_created",
                [{tag: "kr", limit: 20}]
            ]
        }
        return fetch('https://api.steemit.com', {
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => res.result)
    }

    _fetchFollowing() {
        const data = {
            id: 2,
            jsonrpc: "2.0",
            method: "call",
            params: [
                "follow_api",
                "get_following",
                ["anpigon", "", "blog", 10]
            ]
        }
        return fetch('https://api.steemit.com', {
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => res.result.map(({following}) => following))
    }

    render() {
        return (
            <Container style={styles.container}>
                <Header>
                    <Left><Icon name='ios-camera' style={{paddingLeft:10}}/></Left>
                    <Body><Text>Instagram</Text></Body>
                    <Right><Icon name='ios-send' style={{paddingRight:10}}/></Right>
                </Header>
                <Content>
                    <View style={styles.storyContainer}>
                        <View style={styles.storyTitle}>
                            <Text style={styles.boldText}>Stories</Text>

                            <View style={styles.storyImage}>
                                <Icon name='md-play' style={{fontSize: 14}}/>
                                <Text style={styles.boldText}>Watch All</Text>
                            </View>
                        </View>

                        <View style={styles.viewThumbnail}>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{
                                    alignItems: 'center',
                                    paddingStart: 5,
                                    paddingEnd: 5
                                }}>
                                {
                                    this.state.followings.map((following, i) =>
                                        <Thumbnail key={i} style={{marginHorizontal: 5, borderColor: 'pink', borderWidth: 2}}
                                                   source={{uri: `https://steemitimages.com/u/${following}/avatar`}}/>
                                    )
                                }
                            </ScrollView>
                        </View>
                    </View>

                    {
                        this.state.feeds.map(feed => <CardComponent key={feed.url} data={feed}/>)
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
    },

    storyContainer: {
        height: 100,
    },

    storyTitle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 7
    },

    storyImage: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    boldText: {
        fontWeight: 'bold'
    },

    viewThumbnail: {
        flex: 3
    }
})