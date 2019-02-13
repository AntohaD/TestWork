$(function () {

    $("#gridContainer").dxDataGrid({
        dataSource: clients,
        keyExpr: "ID",
        showBorders: true,
        paging: {
            enabled: false
        },
        selection: {
        mode: "multiple"
        },
        editing: {
            mode: "row",
            allowUpdating: true,
            allowDeleting: true,
            allowAdding: true
        },
        columns: [{
            dataField: "Client",
            caption: "Клиент"
        },
        {
            dataField: "City",
            caption: "Город"
        },
        {
            dataField: "Contact",
            caption: "Контакты"
        }],
        selectedRowKeys: [],
        onSelectionChanged: function (e) {
            e.component.refresh(true);
        },
        masterDetail: {
            enabled: true,
            template: function (container, options) {
                var currentEmployeeData = options.data;

                $("<div>")
                    .addClass("master-detail-caption")
                    .text(currentEmployeeData.Client + " Products:")
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
                                data: products
                            }),
                            
                        })
                    }).appendTo(container);
            }
        }
    });
});