import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NgModule } from '@angular/core';
import { IconDefinition } from '@ant-design/icons-angular';
import { EditOutline, StarFill, UserOutline, LockOutline, ArrowDownOutline, ArrowUpOutline } from '@ant-design/icons-angular/icons';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';

registerLocaleData(en);


const icons: IconDefinition[] = [
    EditOutline,
    StarFill,
    UserOutline,
    LockOutline,
    ArrowDownOutline,
    ArrowUpOutline
];

@NgModule({
    imports: [
        NzTableModule,
        NzButtonModule,
        NzDividerModule,
        NzAvatarModule,
        NzIconModule.forRoot(icons),
        NzEmptyModule,
        NzRateModule,
        NzCommentModule,
        NzFormModule,
        NzGridModule,
        NzInputModule,
        NzLayoutModule,
        NzCardModule,
        NzModalModule,
        NzListModule,
        NzResultModule,
        NzSelectModule,
        NzPopconfirmModule,
        NzStatisticModule
    ],
    exports: [
        NzTableModule,
        NzDividerModule,
        NzButtonModule,
        NzAvatarModule,
        NzIconModule,
        NzEmptyModule,
        NzRateModule,
        NzCommentModule,
        NzFormModule,
        NzGridModule,
        NzInputModule,
        NzLayoutModule,
        NzCardModule,
        NzModalModule,
        NzListModule,
        NzResultModule,
        NzSelectModule,
        NzPopconfirmModule,
        NzStatisticModule
    ],
    providers: [{ provide: NZ_I18N, useValue: en_US }]
})
export class MaterialModule { }