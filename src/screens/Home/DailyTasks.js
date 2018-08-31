import React, {Component} from 'react';
import { StyleSheet, FlatList } from 'react-native';
import TaskItem from './TaskItem';
import Colors from '../../styles/colors';

export default class DailyTasks extends Component {
  // temporarily clone data onto state so we can simulate a response and re-render the FlatList
  constructor(props){
    super(props);
    this.state = {
      data: [...this.props.data]
    }
  }

  updateResponse = (id, response) => {
    const data = [...this.state.data].map((item)=>{
      if(item.id===id){
        item.userResponse = response;
      }
      return item;
    });
    this.setState({data});
  }

  render(){
    const { updateResponse } = this;
    return(
      <FlatList
        horizontal={true}
        style={styles.taskList}
        data={this.state.data}
        keyExtractor={item => item.id}
        renderItem={({item}) => <TaskItem updateResponse={updateResponse} {...item} />}
      />
    )
  }
}

const styles = StyleSheet.create({
  taskList: {
    flex: 1
  },
});
