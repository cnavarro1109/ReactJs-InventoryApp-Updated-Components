import React, { Component } from 'react'
import { Table } from 'react-bootstrap'

class app extends Component {

    render() {
        
        var self = this.props.data;

        //alert('from new file');
        //console.log(this.props.name);
        //console.log(this.props.data)

        var inputForm;
        var table;
        var rows;
        var editView;
        var output;

        inputForm = <span>
            <h2>Please enter your inventory Item</h2>
            <form onSubmit={self.onSubmit}>
                <input type="text" placeholder="Enter Name..." name="name" />
                <input type="text" placeholder="Enter description..." name="description" />
                <input type="text" placeholder="Enter quantity..." name="quantity" />
                <button type="submit">Submit</button>
            </form>
        </span>


        
        rows = self.state.inventory.map(function (item, index) {

            //console.log(item);
            //console.log(JSON.stringify(item));

            return Object.keys(item).map(function (s) {
                //console.log("ITEM:" + item[s].name)
                //console.log("ITEM:" + item[s].inventory.name) 
                return (
                    //<tr key={index}>
                    <tr key={s}>
                        <th> {item[s].inventory.name} </th>
                        <th> {item[s].inventory.description} </th>
                        <th> {item[s].inventory.quantity} </th>
                        <th>
                            <button value={item[s].inventory.uuid} onClick={self._handleClick.bind(self)}>Delete</button>
                            <button value={item[s].inventory.uuid} onClick={self._setFireBaseDataEditTable}>Edit</button>
                        </th>
                    </tr>
                )
            });


        });

        table = (
            <span>
                <Table striped bordered condensed hover>
                    <thead>
                        <tr>
                            <th> Name </th>
                            <th> Description </th>
                            <th> Quantity </th>
                            <th> Actions </th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </Table>
            </span>
        )

        editView = (
            <div>
                <h2>Edit Mode</h2>
                <form onSubmit={self._updateFireBaseRecord}>
                    <input type="text" value="default" value={self.state.editFields.name} onChange={self.handleChange} name="name" />
                    <input type="text" value={self.state.editFields.description} onChange={self.handleChange} name="description" />
                    <input type="text" value={self.state.editFields.quantity} onChange={self.handleChange} name="quantity" />
                    <input type="text" className="hideinput" value={self.state.editFields.uuid} name="uuid" />
                    <button type="submit" type="submit" >Submit</button>
                </form>
            </div>
        );



        if (self.state.editMode) {
            output = (
                <div className="App">
                    <div className="App-header">
                        <h2>Inventory App</h2>
                    </div>
                    <div className="text-center">
                        {editView}
                    </div>
                </div>
            );
        } else {
            output = (
                <div>
                    <div className="App-header">
                        <h2>Inventory App</h2>
                    </div>
                    <div className="text-center">
                        {inputForm}
                        <br />
                        {table}
                    </div>
                </div>
            );
        }

        return output;
    }

}

export default app;