import { Component, OnInit } from '@angular/core';
import {
  delay,
  distinctUntilChanged,
  forkJoin,
  from,
  fromEvent,
  interval,
  map,
  of,
  range,
} from 'rxjs';
import {
  debounceTime,
  pluck,
  switchMap,
  take,
  takeUntil,
  takeWhile,
  throttleTime,
} from 'rxjs/operators';

@Component({
  selector: 'app-point-3',
  template: `
    <button>按钮</button>
  `,
})
export class Point3Component implements OnInit {
  ngOnInit() {
    // this._range();
    this._from();
    // this._forkJoin();
    // this._fromEvent();
    // this._interval();
    // this._take();
    // this._throttle();
    // this._of();
  }

  // range map
  private _range(): void {
    // range生成一个observable对象，从1开始 每一次都递增next一个值
    const observable = range(1, 5);
    observable.pipe(map((value) => value * 10)).subscribe(console.log);
  }

  // from
  private _from(): void {
    // from可以把数组，promise对象，iterator对象转成observable对象
    const observable1 = from([{ name: 'xiaoming' }, 2, 'xixixi']);
    const observable2 = from(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve('哈哈哈哈');
        }, 2000);
      })
    );
    const observable3 = from(
      new Map([
        ['person1', { name: '小明' }],
        ['person2', { name: '小红' }],
      ])
    );
    observable1.subscribe(console.log);
    // observable2.subscribe(console.log);
    // observable3.subscribe(console.log);
  }

  // forkJoin https://segmentfault.com/a/1190000012369871
  private _forkJoin(): void {
    // 合并多个Observable对象，类似于Promise.all
    const observable = forkJoin([
      range(1, 5).pipe(delay(1000)),
      range(11, 5).pipe(delay(1500)),
    ]);
    observable.subscribe(console.log);
  }

  // fromEvent pluck
  private _fromEvent(): void {
    const btn = document.querySelector('button');
    const observable = fromEvent(btn, 'click');
    // pluck 可以从一个对象中取出它的某个属性
    observable.pipe(pluck('target')).subscribe(console.log);
  }

  /**
   *  interval switchMap
   *  https://segmentfault.com/a/1190000011070872
   */
  private _interval(): void {
    // 从0开始 每隔一秒递增地next的一个值
    // const observable = interval(1000);
    // observable.subscribe(console.log);
    const btn = document.querySelector('button');
    const btnObservable = fromEvent(btn, 'click');
    // switchMap 相当于把原来的btnObservable换成了interval这个observable 并且每一次switchMap都会取消上一次的
    btnObservable
      // 每次点击的时候激活一个新的interval。重复点击时放弃上一个interval新起一个interval
      .pipe(switchMap((event) => interval(1000)))
      .subscribe(console.log);
    // map相当于下一个管道操作符或者subscribe里的值就是map返回的值
    btnObservable.pipe(map((event) => interval(1000))).subscribe(console.log);
  }

  // take takeWhile takeUntil
  private _take(): void {
    const observable = range(1, 10);
    // 只取数据流的前几个
    observable.pipe(take(3)).subscribe(console.log);
    // takeWhile 一直取数据流，直到表达式为false 表达式如果为false则立刻就会结束流，即使后面的数据可能满足
    observable.pipe(takeWhile((value) => value >= 2)).subscribe(console.log);

    // takeUntil 一直取数据流，直到某一个可观察对象发出值，然后立刻结束流
    const btn = document.querySelector('button');
    fromEvent(document, 'mousemove')
      .pipe(takeUntil(fromEvent(btn, 'click')))
      .subscribe(console.log);
  }

  // throttleTime debounceTime
  private _throttle(): void {
    const observable = fromEvent(document, 'click');
    observable.subscribe(console.log);
    // 当一个observable高频大量地向外发送数据时，throttleTime会每隔一段时间才去取值
    observable.pipe(throttleTime(1000)).subscribe(console.log);

    // 当一个observable高频大量地向外发送数据时，debounceTime只取最后一次
    observable.pipe(debounceTime(1000)).subscribe(console.log);
  }

  // of distinctUntilChanged
  private _of(): void {
    // 将参数列表中的每一项都发射出去
    // const observable1 = of(1, 'xixi', true, {}, []);
    // observable1.subscribe(console.log);
    const observable2 = of({}, {}, 1, 1, 2, true, true, 'xx', 'xx');
    // 判断上一个数据流的值是否和当前数据流相同，如果相同则舍弃
    observable2.pipe(distinctUntilChanged()).subscribe(console.log);
  }
}
