import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { schema } from './schema.value';
import { Graph } from '@antv/x6';
import { Chart } from '@antv/g2';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  files = [];
  @ViewChild('editor') editor: JsonEditorComponent;
  public editorOptions: JsonEditorOptions;
  public data: any;
  cols: any[];
  public showData;

  dataX6 = {
    // 节点
    nodes: [
      {
        id: 'node1', // String，可选，节点的唯一标识
        x: 40, // Number，必选，节点位置的 x 值
        y: 40, // Number，必选，节点位置的 y 值
        width: 80, // Number，可选，节点大小的 width 值
        height: 40, // Number，可选，节点大小的 height 值
        label: 'hello', // String，节点标签
      },
      {
        id: 'node2', // String，节点的唯一标识
        x: 160, // Number，必选，节点位置的 x 值
        y: 180, // Number，必选，节点位置的 y 值
        width: 80, // Number，可选，节点大小的 width 值
        height: 40, // Number，可选，节点大小的 height 值
        label: 'world', // String，节点标签
      },
    ],
    // 边
    edges: [
      {
        source: 'node1', // String，必须，起始节点 id
        target: 'node2', // String，必须，目标节点 id
      },
    ],
  };
  dataG2 = [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ];
  constructor(private http: _HttpClient) {
    this.editorOptions = new JsonEditorOptions();
    this.editorOptions.schema = schema;

    this.initEditorOptions(this.editorOptions);
  }
  changeLog(event = null) {
    console.log(event);
    console.log('change:', this.editor);
    const editorJson = this.editor.getEditor();
    editorJson.validate();
    const errors = editorJson.validateSchema.errors;
    if (errors && errors.length > 0) {
      console.log('Errors found');
      editorJson.set(this.data);
    } else {
      this.data = this.showData = this.editor.get();
    }
  }

  changeEvent(event) {
    console.log(event);
  }

  initEditorOptions(editorOptions) {
    editorOptions.mode = 'preview'; // set only one mode
    editorOptions.mainMenuBar = false; // 添加主菜单栏 - 包含格式、排序、转换、搜索等功能。true默认。适用于所有类型的mode.
    editorOptions.search = false;
    editorOptions.navigationBar = false;
    editorOptions.statusBar = false;
    // editorOptions.modes = ['code', 'text', 'tree', 'view', 'form', 'preview']; // set all allowed modes
    // this.editorOptions.ace = (<any>window).ace.edit('editor');
  }
  ngOnInit() {
    this.http.get('parms/list').subscribe((files) => {
      this.files = files;
      console.log(this.files);
    });
    this.data = {
      randomNumber: 2,
      products: [
        {
          name: 'car',
          product: [
            {
              name: 'honda',
              model: [
                { id: 'civic', name: 'civic' },
                { id: 'accord', name: 'accord' },
                { id: 'crv', name: 'crv' },
                { id: 'pilot', name: 'pilot' },
                { id: 'odyssey', name: 'odyssey' },
              ],
            },
          ],
        },
      ],
    };
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'size', header: 'Size' },
      { field: 'type', header: 'Type' },
    ];
    const graph = new Graph({
      container: document.getElementById('container'),
      width: 800,
      height: 600,
    });
    graph.fromJSON(this.dataX6);

    // Step 1: 创建 Chart 对象
    const chart = new Chart({
      container: 'c1', // 指定图表容器 ID
      width: 600, // 指定图表宽度
      height: 300, // 指定图表高度
    });

    // Step 2: 载入数据源
    chart.data(this.dataG2);

    // Step 3: 创建图形语法，绘制柱状图
    chart.interval().position('genre*sold');

    // Step 4: 渲染图表
    chart.render();
  }
  save(): void {
    console.log(this.files);
  }
  add(data: any = {}): void {
    console.log(data);
    data.node.children = [
      {
        data: {
          name: 'list',
          size: '200mb',
          type: 'Array',
        },
      },
      ...data.node.children,
    ];
    this.files = [
      {
        data: {
          name: 'list',
          size: '200mb',
          type: 'Array',
        },
      },
      ...this.files,
    ];
    console.log(this.files);
  }
}
