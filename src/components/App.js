import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    };
    
    addFish = fish => {
        const fishes = {...this.state.fishes};
        fishes[`fish${Date.now()}`] = fish;
        this.setState({
            fishes
        });
    }
    
    addToOrder = key => {
        const order = {...this.state.order};
        order[key] = order[key] + 1 || 1;
        this.setState({order});
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
                    <Order order={this.state.order} fishes={this.state.fishes} />
                    <Inventory addFish={this.addFish} loadSampleFish={this.loadSampleFish} />
            </div>
        )
    }
}

export default App;