import { buildCivicQuery } from '../../util/functions';

export default async function(){
  const url = buildCivicQuery([this.state.address, this.state.city, this.state.zipcode]);
  try {
    const result = await fetch(url);
    const resultJson = await result.json();
    if(!resultJson.error){
      if(!resultJson.offices){
        if(this.state.view==='ADDRESS_NEEDED'){
          this.setState({view: 'DISTRICT_NOT_FOUND'}, ()=>{
            this.setState({isLoading: false});
          })
        }else{
          this.setState({view: 'ADDRESS_NEEDED'}, () => {
            this.setState({isLoading: false});
          });
        }
      }else{
        const officeName = resultJson.offices[0].name.split(' ');
        const district = officeName[officeName.length-1];
        /**
         * Do something with the district here then navigate to main App...
         */
        this.props.navigate('App');
      }
    }else{
      throw resultJson.error;
    }
  } catch(error){
    if(this.state.view==='ADDRESS_NEEDED'){
      this.setState({view: 'DISTRICT_NOT_FOUND'}, ()=>{
        this.setState({isLoading: false});
      })
    }else{
      this.setState({view: 'ADDRESS_NEEDED'}, () => {
        this.setState({isLoading: false});
      });
    }
  }
}
