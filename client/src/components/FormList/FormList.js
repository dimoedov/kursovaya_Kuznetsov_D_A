import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import filterFactory  from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Link, Redirect } from 'react-router-dom';
const MyExportCSV = (props) => {
    const handleClick = () => {
        props.onExport();
    };
    return (
        <div>
            <button className="btn btn-success" onClick={ handleClick }>Export to CSV</button>
        </div>
    );
};
const get_cookie = ( cookie_name ) =>
{
    let results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );

    if ( results )
        return ( unescape ( results[2] ) );
    else
        return null;
};
class FormList extends Component {


    state = {
        products: [],
        columns: [
            {
                dataField: '_id',
                isKey: true,
                text: 'Номер услуги',
                sort: true,
                selected: false,
                footer: ''
            },
            {
                dataField: 'kind_of_work',
                text: 'Вид работы',
                sort: true,
                selected: false,
                footer: ''
            }, {
                dataField: 'service',
                text: 'Услуга',
                sort: true,
                selected: false,
                footer: ''
            }, {
                dataField: 'engineer',
                text: 'Работник',
                sort: true,
                selected: false,
                footer: 'Общая цена:'
            }, {
                dataField: 'price',
                text: 'Цена услуги',
                sort: true,
                selected: false,
                footer: columnData => columnData.reduce((acc, item) => parseInt(acc) + parseInt(item), 0)
            }],
        selected: []
    };

    componentDidMount() {
        fetch('/api/carfix').then(res => res.json())
            .then(data => this.setState({products: data}))
            .catch(err => console.log("err: =" + err));
    }
    handleGetSelectedData = () => {
        // console.log(this.state.selected);
        let formBody = [];
        for (let prop in this.state) {
            let encodedKey = encodeURIComponent(prop);
            let encodedValue = encodeURIComponent(this.state[prop]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        fetch('/api/carfix/?id='+this.state.selected, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then(res => res.json())
            .then(data => this.setState({serverOtvet: data}))
            .catch(err => console.log("err: =" + err));
    };
    handleDataChange = ({ dataSize }) => {
        this.setState({ rowCount: dataSize });
    };
    handleOnSelect = (row, isSelect) => {
        if (isSelect) {
            this.setState(() => ({
                selected: [...this.state.selected, row._id]
            }));
        } else {
            this.setState(() => ({
                selected: this.state.selected.filter(x => x !== row._id)
            }));
        }
    };

    handleOnSelectAll = (isSelect, rows) => {
        const ids = rows.map(r => r._id);
        if (isSelect) {
            this.setState(() => ({
                selected: ids
            }));
        } else {
            this.setState(() => ({
                selected: [0,]
            }));
        }
    };
    render() {
        const selectRow = {
            mode: 'checkbox',
            clickToSelect: true,
            bgColor: '#8f0008',
            selected: this.state.selected,
            onSelect: this.handleOnSelect,
            onSelectAll: this.handleOnSelectAll,
            headerColumnStyle: (status) => {
                if (status === 'checked') {
                    return {
                        backgroundColor: '#8f0008'
                    };
                } else if (status === 'indeterminate') {
                    return {
                        backgroundColor: 'yellow'
                    };
                } else if (status === 'unchecked') {
                    return {
                        backgroundColor: '#0069d9'
                    };
                }
                return {};
            }
        };
        if (get_cookie('Authorized') === null){
            return <Redirect to="/" />;
        }else
        return (
            <div className="container" style={{ marginTop: 50 }}>
                <div>
                    <ToolkitProvider
                        keyField={'_id'}
                        data={ this.state.products }
                        columns={ this.state.columns }
                        exportCSV={ {
                            fileName: Date()+'.csv',
                            separator: "    ",
                            ignoreFooter: false,
                            noAutoBOM: false,
                            blobType: 'text/csv; charset = геа-8'
                        } }
                    >
                        {
                            props => (
                                <div>
                                    <div className='btn-group'>
                                        <Link to='/Personal'><button className="btn btn-primary">Добавить</button></Link>
                                        <MyExportCSV  { ...props.csvProps }>Export</MyExportCSV >
                                        <button className="btn btn-secondary" onClick={ this.handleGetSelectedData }>Удалить отмеченные</button>
                                    </div>
                                    <hr />
                                    <h5>Row Count:<span className="badge">{ this.state.rowCount }</span></h5>
                                    <BootstrapTable
                                        onDataSizeChange={ this.handleDataChange }
                                        ref={ n => this.node = n }
                                        keyField={'_id'}
                                        data={ this.state.products }
                                        columns={ this.state.columns }
                                        filter={ filterFactory() }
                                        selectRow={ selectRow }
                                        pagination={ paginationFactory() }
                                        hover
                                        noDataIndication="Table is Empty"
                                        { ...props.baseProps }
                                    />
                                </div>
                            )
                        }
                    </ToolkitProvider>
                </div>


            </div>
        );
    }
}
//https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Basic%20Table&selectedStory=Indication%20For%20Empty%20Table&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
export default FormList;
