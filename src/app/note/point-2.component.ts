import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

@Component({
  selector: 'app-point-2',
  template: '',
})
export class Point2Component implements OnInit {
  ngOnInit() {
    // 1.Subject被订阅后不会立即执行，而是会等到next之后
    const subject1$ = new Subject<string>();
    subject1$.subscribe((res) => {
      console.log(res, 'Subject');
    });
    setTimeout(() => {
      subject1$.next('Subject value1');
    }, 1000);

    // 2.BehaviorSubject和Subject基本相同，BehaviorSubject可以传入默认值，并且被订阅后会立即执行
    const subject2$ = new BehaviorSubject('默认');
    subject2$.subscribe((res) => {
      console.log(res, 'BehaviorSubject');
    });
    setTimeout(() => {
      subject2$.next('BehaviorSubject value2');
    }, 1500);

    // 3.ReplaySubject和Subject相同, 但是它可以广播之前的历史值，参数决定传最近的多少个值。而subject不会广播之前的值
    const subject3$ = new ReplaySubject(2);
    subject3$.subscribe((res) => {
      console.log(res, 'ReplaySubject1');
    });
    subject3$.next(1);
    subject3$.next(2);
    subject3$.next(3);
    subject3$.next(4);

    setTimeout(() => {
      subject3$.subscribe((res) => {
        console.log(res, 'ReplaySubject2');
      });
    }, 1000);
  }
}
