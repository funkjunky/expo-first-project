import React from 'react';
import { Text, View, ScrollView, TextInput, Button } from 'react-native';
import { SQLite } from 'expo';

class DemoScreen extends React.Component {
    constructor() {
        super();

        this.state = { items: [], todoText: '' };
    }
    db = null;

    componentWillMount() {
        this.db = SQLite.openDatabase({ name: 'db.db' });
        console.log('mounting... ', this.db);
        this.db.transaction(dbh => {
            console.log('dbh: ', dbh, dbh.executeSql);
            dbh.executeSql('create table if not exists items (id integer primary key not null, done int, value text)',
                [],
                () => console.log('success'),
                err => console.log('failure', err)
            );
            dbh.executeSql(
                'select id, value, done from items',
                [],
                (tx, { rows }) => {
                    console.log('rows: ', rows);
                    this.setState({ items: rows._array });
                },
                err => console.log('faiolure', err)
            )
        });
    }

    addItem = () => {
        this.db.transaction(dbh => {
            dbh.executeSql(
                'insert into items (done, value) values (0, ?)',
                [this.state.todoText],
                (tx, { insertId: id }) => this.setState({items: [...this.state.items, { id, value: this.state.todoText, done: 0 }] }),
                err => console.log('failddd: ', err)
            );
        });
    };

    render() {
        const { todoText, items } = this.state;
        return <View style={{ margin: 20, height: '100%', flex: 1, justifyContent: 'space-between' }}>
            <Text>TODOs - <Text onPress={ () => this.props.navigator.pop() }>Back</Text></Text>
            <View>
                <Text>New Item:</Text>
                <TextInput style={{ height: 40, borderWidth: 1, borderColor: 'black' }} onChangeText={ todoText => this.setState({ todoText }) } value={ todoText } />
                <Button title="Add" onPress={ () => this.addItem() } />
            </View>
            <ScrollView>
                { this.state.items.map(({ id, done, value }) => (
                    <View key={ id }>
                        <Text>{ value }</Text>
                        <Text>Done: { done ? 'Y' : 'N' }</Text>
                    </View>
                ))}
            </ScrollView>
        </View>;
    }
}

export default DemoScreen;
