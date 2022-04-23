import React, { Component } from "react";
import { Text, View, ScrollView, StyleSheet, FlatList, Modal, Button    } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { CAMPSITES } from "../shared/campsites";
import { COMMENTS } from '../shared/comments';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';


const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        comments: state.comments,
        favorites: state.favorites,
        ShowModal: false
        /*rating to 5
        author to an empty string
        text to an empty string.*/
    };
};

const mapDispatchToProps = {
    postFavorite: campsiteId => (postFavorite(campsiteId))
};

function RenderCampsite(props) {

    const {campsite} = props;

    if (campsite) {
        return (
            <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                <Card
                    . . .
                </Card>
            </Animatable.View>
. . .
    return (
        <Animatable.View animation='fadeInUp' duration={2000} delay={1000}>
            <Card title='Comments'>
                . . .
            </Card>
        </Animatable.View>
                featuredTitle={campsite.name}
                image={{uri: baseUrl + campsite.image}}>
                <Text style={{margin: 10}}>
                    {campsite.description}
                </Text>
                <Icon
                    name={props.favorite ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    raised
                    reverse
                    onPress={() => props.favorite ? 
                        console.log('Already set as a favorite') : props.markFavorite()}
                />
                 <Icon
                    name={props.favorite ? 'pencil' : 'pencil-o'}
                    type='font-awesome'
                    color='#5637DD'
                    raised
                    reverse
                    onPress={() => props.onShowModal()}
                />
            </Card>
            </View>
                       <Modal
                       animationType={'slide'}
                       transparent={false}
                       visible={this.state.showModal}
                       onShowModal={() => this.toggleModal()};
                       onRequestClose={() => this.toggleModal()}
                       handleComment={(campsiteID) => this.toggleModal()}     
                       console.log(JSON.stringify(this.state));              >
                       <View style={styles.modal}>
                           <Text style={styles.modalTitle}>Submit Rating</Text>
                           </Text>
                           <Button
                               onPress={() => {
                                   this.toggleModal();
                                   this.resetForm();
                               }}
                               color='#808080'
                               title='Cancel'
                           />
                                                  <View style={styles.modal}>
                           <Text style={styles.modalTitle}>Rating</Text>
                           </Text>
                           <Button
                               onPress={() => {
                                   this.toggleModal();
                                   this.resetForm();
                               }}
                               color='#808080'
                               title='Cancel'
                               /* Add 2 Input connectors, and button component
                           />
                       </View>
                   </Modal>
    );
  }
  return <View />;
}

function RenderComments({comments}) {

  const renderCommentItem = ({item}) => {
      return (
          <View style={{margin: 10}}>
              <Text style={{fontSize: 14}}>{item.text}</Text>
              <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
              <Text style={{fontSize: 12}}>{`-- ${item.author}, ${item.date}`}</Text>
          </View>
      );
  };

  return (
      <Card title='Comments'>
          <FlatList
              data={comments}
              renderItem={renderCommentItem}
              keyExtractor={item => item.id.toString()}
          />
      </Card>
  );
}

class CampsiteInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorite: false
  };
  }

  markFavorite(campsiteId) {
    this.props.postFavorite(campsiteId);
}

  static navigationOptions = {
    title: "Campsite Information",
  };

  render() {
    const campsiteId = this.props.navigation.getParam('campsiteId');
    const campsite = this.props.campsites.campsites.filter(campsite => campsite.id === campsiteId)[0];
    const comments = this.props.comments.comments.filter(comment => comment.campsiteId === campsiteId);
    return (
        <ScrollView>
                <RenderCampsite campsite={campsite}
                    favorite={this.props.favorites.includes(campsiteId)}
                    markFavorite={() => this.markFavorite(campsiteId)}
                />
            <RenderComments comments={comments} />
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  stackIcon: {
      marginLeft: 20,
      color: '#fff',
      fontSize: 24
      /*
      a cardRow style with:
alignItems and justifyContent set to 'center'
flex set to 1
flexDirection set to 'row'
margin set to 20
a modal style with:
justifyContent set to 'center'
margin set to 20
Add styles to components:
Apply the cardRow style to the View component that you wrapped around the two Icon components in RenderCampsite.
Apply the modal style to only the first View component inside the Modal, just as you did in the Modal for the ReservationComponent.
Add an inline style of style={{margin: 10}} to the second, nested View component inside the Modal. Do not use the Stylesheet for this. */
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CampsiteInfo);

