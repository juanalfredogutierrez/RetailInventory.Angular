import {
  ChangeDetectionStrategy,
  Component,
  input
} from '@angular/core';

@Component({
  selector: 'app-ui-card',
  standalone: true,
  imports: [],
  templateUrl: './ui-card.component.html',
  styleUrl: './ui-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiCardComponent {

  title = input<string>('');

  subtitle = input<string>('');

  padding = input<'none' | 'sm' | 'md' | 'lg'>('md');

  shadow = input<'none' | 'sm' | 'md' | 'lg'>('md');

  variant = input<'default' | 'outlined' | 'filled'>('default');

}