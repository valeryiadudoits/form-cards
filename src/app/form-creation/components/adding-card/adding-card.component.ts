import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-adding-card',
  templateUrl: './adding-card.component.html',
  styleUrl: './adding-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddingCardComponent {
  @Input() public disabled = false;
  @Output() public addedNewUser: EventEmitter<void> = new EventEmitter();

  public onAddNewUser(): void {
    if (this.disabled) {
      return;
    }
    this.addedNewUser.emit();
  }
}
