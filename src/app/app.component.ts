import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AgVirtualSrollComponent } from 'ag-virtual-scroll';
import { Datasource, UiScrollDirective } from 'ngx-ui-scroll';
import { Observable, Subject } from 'rxjs';
// import { IDatasource } from 'ngx-ui-scroll';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  alive$ = new Subject<void>();

  @ViewChild('vs') agVirtualScroll: any;
  @ViewChild('cdkViewport') cdkViewport: any;
  @ViewChild(UiScrollDirective) ngxUiScroll: any;

  title = 'sample';

  dummyText: string = 'Hello, we work at Mable.';

  data: { index: number, text: string}[] = [];
  dataLoaded: boolean = false;

  ngOnInit(): void {
    this.generateData()
  }

  ngAfterViewInit(): void {
    console.log('virtual scroll', this.agVirtualScroll);
    console.log('cdkViewport', this.cdkViewport);
    console.log('UiScrollDirective', this.ngxUiScroll);
    
    this.cdkVirtualExperimentalHandler();
    this.ngxUiScrollHandler();
  }

  getRndInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  getString() {
    const str = [];
    const size = this.getRndInteger(2, 10);
    for (let i = 0; i < size; i++) {
      str.push(`${this.dummyText}`);
    }
    return str.join('\n')
  }

  generateData() {
    for (let i = 0; i < 1000; i++) {
      this.data.push({ index: i, text: this.getString() });
    }
    // console.log(this.data);
    this.dataLoaded = true;
  }


  /*
    AG VIRTUAL SCROLL
  */

  scrollToBottomOnLoad: boolean = true;
  agVirtualScrollInitialized: boolean = false;
  onAgScroll_itemsRender(event: any) {
    // console.log(`items rendered: from ${event?.startIndex} to ${event.endIndex} -- contentHeight: ${this.agVirtualScroll['contentHeight']} currentScroll: ${this.agVirtualScroll['currentScroll']}`)
    if(this.scrollToBottomOnLoad) {
      const containerHeight = this.agVirtualScroll.el.clientHeight;
      const content = this.agVirtualScroll['contentHeight'];
      const scrollPos = this.agVirtualScroll['currentScroll'];
      const targetPos = scrollPos + containerHeight;
      // console.log(`containerHeight ${containerHeight}, targetPos ${targetPos}`);

      if(targetPos <= content) {
        setTimeout(() => {
          this.agVirtualScroll.el.scrollTop = targetPos;
        })
      } else {
        this.scrollToBottomOnLoad = false;
        this.agVirtualScrollInitialized = true;
      }
    } else {
      this.agVirtualScrollInitialized = true;
    }
  }

  /* CDK EXPERIMENTAL */
  /* DIDN'T WORK */
  scrollToBottom() {
    // this.cdkViewport.scrollToIndex(this.data.length - 1, 'smooth');
  }

  cdkVirtualExperimentalHandler() {
    this.cdkViewport.setRenderedRange({ start: this.data.length - 10, end: this.data.length });
  }

  /*
    NGX UI SCROLL
  */

  ngxUIDataSource = new Datasource(
    {
      get: (index: number, count: number, success: Function) => {
        const rows = this.data.slice(index, index + count);
        success(rows);
      }
    }
  )

  ngxUiScrollHandler() {
    const { adapter } = this.ngxUIDataSource;
    console.log(adapter);
    setTimeout(() => {
      adapter.reload(this.data.length - 1);
    }, 100)
  }

  log(x: any) {
    console.log('x', x);
  }

  ngOnDestroy(): void {
    this.alive$.next();
    this.alive$.complete();
  }
}