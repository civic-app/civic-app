import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Colors from '../../../styles/colors';

// Components
import SocialLinks from '../SocialLinks';

const candidateData = {
  platformList: [
    { id: 'key1', content:'Colonize Space'},
    { id: 'key2', content:'Healthcare for All'},
    { id: 'key3', content:'Kick Names and Take Ass'}
  ],
  bioContent: 'Lorem ipsum dolor amet woke artisan ennui umami. Street art fixie salvia cray +1 pug chartreuse typewriter art party asymmetrical. Craft beer ramps tousled chillwave. Marfa ennui chicharrones etsy keytar sustainable tote bag synth salvia la croix listicle raclette locavore next level humblebrag. Hoodie kitsch selvage, DIY salvia single-origin coffee thundercats irony hammock meh shaman.',
  socials: {
    facebook: '',
    phone: '',
    email: '',
    twitter: ''
  }
}

const Biography = ({bioContent}) =>
  /**
   * Biography Section > About Tab > CandidateDetail
   * - prop  platformData - Array List of Objects with "id" & "content" keys
   */
  <View style={styles.textContainer}>
    <Text style={styles.heading}>Biography</Text>
    <Text>{bioContent}</Text>
    <Text style={styles.readMoreText}>Read more</Text>
  </View>

const Platform = ({platformList}) =>
  /**
   * Platform Section > About Tab > CandidateDetail
   * - prop {array} platformList - Array List of Objects with "id" & "content" keys
   */
  <View style={styles.textContainer}>
    <Text style={styles.heading}>Platform</Text>
    <FlatList
      data={platformList}
      renderItem={({item})=><Text key={item.id}>• {item.content}</Text>}
      keyExtractor={(item)=>item.id}
    />
    <Text style={styles.readMoreText}>Read more</Text>
  </View>

const AboutScreen = props =>
  <View style={styles.container}>
    <Biography {...candidateData}/>
    <Platform {...candidateData}/>
    <SocialLinks {...candidateData.socials} size={28} color={Colors.lightBlue}/>
  </View>

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textContainer: {
    padding: 20,
    borderBottomWidth:1,
    borderColor: Colors.lightGray
  },
  heading: {
    fontSize:18,
    padding: 0,
    fontWeight:'bold',
    paddingBottom: 10
  },
  readMoreText: {
    color: Colors.lightGray,
    paddingTop: 10
  }
});

export default AboutScreen;
