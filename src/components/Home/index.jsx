import React from 'react';
import * as firebase from 'firebase';
import Input from './styled/input.jsx';
import Match from './styled/match.jsx';
import Panel from './styled/panel.jsx';
import Entry from './styled/entry.jsx';
import Winner from './styled/winner.jsx';
import AddButton from './styled/addbutton.jsx';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            matches: {}
        };
    };

    componentDidMount() {
        const matches = firebase.database().ref().child('matches');
        matches.on('value', (snap) => {
            let dbMatches = [];
            snap.forEach((match) => {
                dbMatches.push(match.val());
                this.setState({
                    matches: dbMatches,
                });
            });
        });
    }

    addResult() {
        firebase.database().ref('matches').push({
            floris: document.getElementById('floris').value,
            ivo: document.getElementById('ivo').value
        });
    }

    render() {
        let floris = 0;
        let ivo = 0;
        let result = '';
        let matches = '';
        if (this.state.matches.length > 0) {
            this.state.matches.forEach(function (match) {
                if (match.floris > match.ivo) {
                    floris++;
                } else {
                    ivo++;
                }
            });
            if (floris > ivo) {
                result = 'Leader: Floris, with ' + floris + ' - ' + ivo;
            } else if (ivo > floris) {
                result = 'Leader: Ivo, with ' + ivo + ' - ' + floris;
            } else {
                result = 'Draw, at ' + floris + ' - ' + ivo;
            }
            matches = this.state.matches.map((match) => {
                if (match.floris > match.ivo) {
                    return <Match key={Math.random()}><Winner>Floris</Winner> {match.floris} - {match.ivo} Ivo</Match>;
                } else {
                    return <Match key={Math.random()}>Floris {match.floris} - {match.ivo} <Winner>Ivo</Winner></Match>;
                }
            });
        }
        return (
            <div>
                <Panel>
                    {matches}
                    <Entry>{result}</Entry>
                </Panel>
                <Panel>
                    <Entry>Floris: <Input type="number" id="floris"/>, Ivo:<Input type="number" id="ivo"/></Entry>
                    <Entry>
                        <AddButton onClick={this.addResult.bind(this)}>Add result</AddButton>
                    </Entry>
                </Panel>
            </div>
        );
    }
}