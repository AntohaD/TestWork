$(function () {
    var clientStore = new DevExpress.data.ArrayStore({
        key: "ID",
        data: employees
    });

    var button = $("button").dxButton({
        disabled: true,
        onClick: function () {
            $.each(dataGrid.getSelectedRowKeys(), function () {
                // console.log(clientStore._array[this-1]);
                // console.log(dataGrid);

                $("#gridContainer").dxDataGrid({
                    selection: {
                        mode: "multiple",
                    },
                    editing: {
                        allowUpdating: false,
                        allowDeleting: true,
                        allowAdding: true
                    },
                    selectedRowKeys: [],
                });
            });
            dataGrid.refresh();
        }
    }).dxButton("instance");

    var dataGrid = $("#gridContainer").dxDataGrid({
        dataSource: clientStore,
        // keyExpr: "ID",
        showBorders: true,
        paging: {
            enabled: false
        },
        selection: {
            mode: "multiple",
        },
        editing: { 
            mode: "row",
            allowUpdating: true,
            allowDeleting: true,
            allowAdding: true,
        },        
        onSelectionChanged: function (e) {
            button.option("disabled", !e.selectedRowsData.length);
            // e.component.refresh(true);
            // e.selectedRowsData[e.selectedRowsData.length - 1].Submited = 'true';
            // var num = e.selectedRowsData[e.selectedRowsData.length - 1].Submited;
            // // console.log(num);
            // console.log(e);
            // $('button').click(function (fu) {
            //     // for (let i = 0; i < e.selectedRowsData.length; i++) {
            //     //     console.log(e.selectedRowsData[i].ID);
            //     // }
            //     $("#gridContainer").dxDataGrid ({
            //         selection: {
            //             mode: "multiple",
            //         },
            //         editing: {
            //             allowUpdating: false,
            //             allowDeleting: true,
            //             allowAdding: true
            //         },
            //         selectedRowKeys: [],
            //     });
            // });
        },
        columns: [{
            dataField: "Date document",
            caption: "Дата документа",
            dataType: "date",
            width: '18%'
        }, 
        {
            dataField: "Date created",
            caption: "Дата создания",
            dataType: "date",
            width: '18%'
        },
        {
            dataField: "Date submited",
            caption: "Дата проведения документа",
            dataType: "date",
            width: '18%'
        }, 
        {
            dataField: "Client",
            caption: "Клиент",
            lookup: {
                dataSource: employees,
                displayExpr: "Client",
                valueExpr: "Client"
            },
            width: '22%'
        },
        {
            dataField: "Submited",
            caption: "Документ проведен",
            width: '18%'
        }],
        masterDetail: {
            enabled: true,
            template: function (container, options) {
                var currentEmployeeData = options.data;

                $("<div>")
                    .addClass("master-detail-caption")
                    .text(currentEmployeeData.Client + " Orders:")
                    .appendTo(container);

                $("<div>")
                    .dxDataGrid({
                        columnAutoWidth: true,
                        showBorders: true,
                        paging: {
                            enabled: false
                        },
                        editing: {
                            mode: "row",
                            allowUpdating: true,
                            allowDeleting: true,
                            allowAdding: true
                        },
                        columns: [{
                            dataField: "Product",
                            caption: "Товар",
                        }, 
                        {
                            dataField: "Quantity",
                            caption: "Количество",
                        }, 
                        {
                            dataField: "Price",
                            caption: "Цена",
                        }],
                        dataSource: new DevExpress.data.DataSource({
                            store: new DevExpress.data.ArrayStore({
                                key: "ID",
                                data: tasks
                            }),
                            filter: ["EmployeeID", "=", options.key]
                        })
                    }).appendTo(container);
            }
        }
    }).dxDataGrid("instance");
});