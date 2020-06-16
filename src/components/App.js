import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
    constructor(){
        super();
        this.addFish = this.addFish.bind(this);
        this.updateFish = this.updateFish.bind(this);
        this.loadSampleFish = this.loadSampleFish.bind(this);
        this.addToOrder = this.addToOrder.bind(this);
        this.removeFish = this.removeFish.bind(this);
        this.removeFromOrder = this.removeFromOrder.bind(this);
    }
    state = {
        fishes: {},
        order: {}
    };
    componentDidMount(){
        const { params } = this.props.match;
        const localStorageRef = localStorage.getItem(params.storeId)
        if(localStorageRef){
            this.setState({ order: JSON.parse(localStorageRef)})
        }
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    }
    componentDidUpdate(){
        console.log(this.state.order)
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order))
    }
    componentWillUnmount(){
        base.removeBinding(this.ref);
    }
    addFish = fish => {
        const fishes = {...this.state.fishes};
        fishes[`fish${Date.now()}`] = fish;
        this.setState({
            fishes
        });
    }
    updateFish(key, updatedFish){
        const fishes = {...this.state.fishes};
        fishes[key] = updatedFish;
        this.setState({fishes})
    }
    removeFish(key){
        const fishes = {...this.state.fishes};
        fishes[key] = null;
        this.setState({ fishes });
    }
    addToOrder = key => {
        const order = {...this.state.order};
        order[key] = order[key] + 1 || 1;
        this.setState({order});
    }
    removeFromOrder(key){
        const order = {...this.state.order};
        delete order[key];
        this.setState({ order });
    }
    loadSampleFish = () => {
        this.setState({fishes: sampleFishes})
    }

    render(){
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"/>
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(key => 
                            <Fish 
                                key={key}
                                index={key} 
                                details={this.state.fishes[key]} 
                                addToOrder = {this.addToOrder} 
                            />
                        )}
                    </ul>
                </div>
                    <Order order={this.state.order} fishes={this.state.fishes} removeFromOrder = {this.removeFromOrder}/>
                    <Inventory fishes={this.state.fishes} addFish={this.addFish} loadSampleFish={this.loadSampleFish} updateFish={this.updateFish} removeFish={this.removeFish} />
            </div>
        )
    }
}

export default App;