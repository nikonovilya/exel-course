import 'Styles//overall/base.scss';
import 'Styles/index.scss';
import { Exel } from 'Scripts/components/excel/Excel';
import { Header } from 'Scripts/components/header/Header';
import { Toolbar } from 'Scripts/components/toolbar/Toolbar';
import { Formula } from 'Scripts/components/formula/Formula';
import { Table } from 'Scripts/components/table/Table';

const excel = new Exel('#app', {
  components: [Header, Toolbar, Formula, Table],
});

excel.render();
