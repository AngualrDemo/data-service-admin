import { Component, OnDestroy, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { STColumn, STComponent } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { DialogService, DocumentRef, ModalComponent } from 'ng-devui';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DataSetDownloadComponent } from './data-set-download/data-set-download.component';
import { DataSetFormComponent } from './data-set-form/data-set-form.component';
import { DataSetProbeComponent } from './data-set-probe/data-set-probe.component';
import { DataSetUpdateComponent } from './data-set-update/data-set-update.component';
import { DataSetViewComponent } from './data-set-view/data-set-view.component';

/** 数据集列表 */
@Component({
  selector: 'app-data-manage-data-set-list',
  templateUrl: './data-set-list.component.html',
})
export class DataManageDataSetListComponent implements OnInit, OnDestroy {
  url = `/user`;
  searchSchema: SFSchema = {
    properties: {
      no: {
        type: 'string',
        title: '编号',
      },
    },
  };
  @ViewChild('st') private readonly st!: STComponent;
  /** 数据集列表 表格配置JSON*/
  columns: STColumn[] = [
    { title: '编号', index: 'no' },
    { title: '调用次数', type: 'number', index: 'callNo' },
    { title: '头像', type: 'img', width: '50px', index: 'avatar' },
    { title: '时间', type: 'date', index: 'updatedAt' },
    {
      title: '操作区',
      width: '120px',
      fixed: 'right',
      buttons: [
        {
          text: '上架',
          iif: (record) => record.status == 2 || record.status == 0, // 状态为已下架才可以重新上架
          iifBehavior: 'disabled',
          click: (_record, modal) => this.message.success(`重新加载页面，回传值：${JSON.stringify(modal)}`),
        },
        {
          text: '下架',
          iif: (record) => record.status == 1, // 状态为已上架才可以重新下架
          iifBehavior: 'disabled',
          click: (_record, modal) => this.message.success(`重新加载页面，回传值：${JSON.stringify(modal)}`),
        },
        {
          text: '更多',
          children: [
            {
              text: `数据探查`,
              icon: 'file',
              click: (record) => {
                this.dataSetProbe('Probe');
              },
            },
            {
              text: '数据查看',
              icon: 'edit',
              click: (record) => {
                this.dataSetProbe('View');
              },
            },
            {
              text: '更新记录',
              icon: 'edit',
              click: (record) => {
                this.dataSetProbe('Update');
              },
            },
            {
              text: '下载记录',
              icon: 'edit',
              click: (record) => {
                this.dataSetProbe('Download');
              },
            },
            {
              text: `注销`,
              iif: (record) => record.status == 0, // 状态为待上架的才可注销
              iifBehavior: 'disabled',
              icon: 'logout',
              click: (record) => this.message.error(`${record.id === 1 ? `过期` : `正常`}【${record.name}】`),
            },
          ],
        },
      ],
    },
  ];

  /** 数据集探查 dialog 页面跳转后注意关闭此对话框*/
  dataSetProbeDialog: {
    modalInstance: ModalComponent;
    modalContentInstance: any;
  };

  /** 数据集下载记录 dialog 页面跳转后注意关闭此对话框*/
  dataSetDownloadDialog: {
    modalInstance: ModalComponent;
    modalContentInstance: any;
  };

  /** 数据集更新记录 dialog 页面跳转后注意关闭此对话框*/
  dataSetUpdateDialog: {
    modalInstance: ModalComponent;
    modalContentInstance: any;
  };

  /** 数据集数据查看dialog 页面跳转后注意关闭此对话框*/
  dataSetViewDialog: {
    modalInstance: ModalComponent;
    modalContentInstance: any;
  };

  /** 数据集操作组件集合
   *  Download: 初始化数据集数据更新记录弹框
   *  Probe: 初始化数据集数据探查弹框
   *  View: 初始化数据集数据查看弹框
   *  Update: 初始化数据集数据下载记录弹框
   */
  dialogSet = {
    View: DataSetViewComponent,
    Update: DataSetUpdateComponent,
    Probe: DataSetProbeComponent,
    Download: DataSetDownloadComponent,
  };

  /** 华为组件弹框 */
  scrollTop: number;

  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private message: NzMessageService,
    private dialogService: DialogService,
    private documentRef: DocumentRef,
    private renderer: Renderer2,
  ) {}

  ngOnDestroy(): void {
    if (this.dataSetProbeDialog) this.dataSetProbeDialog.modalInstance.hide();
    if (this.dataSetDownloadDialog) this.dataSetDownloadDialog.modalInstance.hide();
    if (this.dataSetUpdateDialog) this.dataSetUpdateDialog.modalInstance.hide();
    if (this.dataSetViewDialog) this.dataSetViewDialog.modalInstance.hide();
  }

  ngOnInit(): void {}
  /**
   *  Download: 初始化数据集数据更新记录弹框
   *  Probe: 初始化数据集数据探查弹框
   *  View: 初始化数据集数据查看弹框
   *  Update: 初始化数据集数据下载记录弹框
   * @param {('dataSetViewDialog' | 'dataSetUpdateDialog' | 'dataSetProbeDialog' | 'dataSetDownloadDialog')} [dialogType='dataSetProbeDialog']
   * @memberof DataManageDataSetListComponent
   */
  dataSetProbe(dialogType: 'View' | 'Update' | 'Probe' | 'Download' = 'Probe'): void {
    const me = this;
    me.setHtmlStyle();
    me['dataSet' + dialogType + 'Dialog'] = me.dialogService.open({
      id: 'dialog-service-detail',
      width: '80%',
      maxHeight: '500px',
      title: 'xxxx数据集',
      content: me.dialogSet[dialogType],
      dialogtype: 'standard',
      // beforeHidden: () => this.beforeHidden(),
      backdropCloseable: true,
      placement: 'top',
      onClose: () => {
        me.removeHtmlStyle();
      },
      buttons: null,
    });
  }
  setHtmlStyle() {
    this.scrollTop = document.documentElement.scrollTop;
    this.renderer.setStyle(this.documentRef.documentElement, 'top', `-${this.scrollTop}px`);
    this.renderer.setStyle(this.documentRef.documentElement, 'position', 'fixed');
    this.renderer.setStyle(this.documentRef.documentElement, 'width', `100%`);
    this.renderer.setStyle(this.documentRef.documentElement, 'overflow-y', `scroll`);
  }

  removeHtmlStyle() {
    this.renderer.removeStyle(this.documentRef.documentElement, 'position');
    this.renderer.removeStyle(this.documentRef.documentElement, 'width');
    this.renderer.removeStyle(this.documentRef.documentElement, 'overflow');
    this.renderer.removeStyle(this.documentRef.documentElement, 'top');
    document.documentElement.scrollTop = this.scrollTop;
  }
  addDataSet(): void {
    const results = this.dialogService.open({
      id: 'dialog-service',
      width: '80%',
      maxHeight: '500px',
      title: '新增数据集',
      content: DataSetFormComponent,
      dialogtype: 'standard',
      // beforeHidden: () => this.beforeHidden(),
      backdropCloseable: true,
      placement: 'top',
      buttons: [
        {
          cssClass: 'primary',
          text: '保存',
          handler: ($event: Event) => {
            results.modalInstance.hide();
          },
        },
      ],
    });
  }
}
