import {
    ChangeDetectorRef,
    Directive,
    ElementRef,
    NgZone,
    OnDestroy,
    OnInit
} from '@angular/core';

import { fromEvent, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';

@Directive({
    selector: '[appDraggableDialog]',
})
export class DraggableDialogDirective implements OnInit, OnDestroy {
    // Element to be dragged
    private target: HTMLElement;

    // Drag handle
    private handle: HTMLElement;
    private delta = { x: 0, y: 0 };
    private offset = { x: 0, y: 0 };

    private destroy$ = new Subject<void>();

    constructor(
        private elementRef: ElementRef,
        private zone: NgZone,
        private cd: ChangeDetectorRef,
    ) { }

    ngOnInit(): void {
        this.elementRef.nativeElement.style.cursor = 'default';
        this.handle = this.elementRef.nativeElement.parentElement.parentElement.parentElement;
        this.target = this.elementRef.nativeElement.parentElement.parentElement.parentElement;
        this.setupEvents();
    }

    ngOnDestroy(): void {
        if (!!this.destroy$ && !this.destroy$.closed) {
            this.destroy$.next();
            this.destroy$.complete();
        }
    }

    private setupEvents() {
        this.zone.runOutsideAngular(() => {
            const mousedown$ = fromEvent(this.handle, 'mousedown');
            const mousemove$ = fromEvent(document, 'mousemove');
            const mouseup$ = fromEvent(document, 'mouseup');

            const mousedrag$ = mousedown$.pipe(
                switchMap((event: MouseEvent) => {
                    const startX = event.clientX;
                    const startY = event.clientY;
                    return mousemove$.pipe(
                        map((innerEvent: MouseEvent) => {
                            innerEvent.preventDefault();
                            this.delta = {
                                x: innerEvent.clientX - startX,
                                y: innerEvent.clientY - startY,
                            };
                        }),
                        takeUntil(mouseup$),
                    );
                }),
                takeUntil(this.destroy$),
            );

            mousedrag$.subscribe(() => {
                if (this.delta.x === 0 && this.delta.y === 0) {
                    return;
                }
                this.translate();
            });

            mouseup$.pipe(takeUntil(this.destroy$)).subscribe(() => {
                this.offset.x += this.delta.x;
                this.offset.y += this.delta.y;
                this.delta = { x: 0, y: 0 };
                this.cd.markForCheck();
            });
        });
    }

    private translate() {
        requestAnimationFrame(() => {
            this.target.style.transform = `
            translate(${this.offset.x + this.delta.x}px, ${this.offset.y + this.delta.y}px)`;
        });
    }
}
