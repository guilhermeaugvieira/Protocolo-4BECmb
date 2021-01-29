import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input()
  ctrl: string;

  @Input()
  label: string;

  @Input()
  requires: boolean;

  @Input()
  tipo: string;

  @Input()
  nome: string;

  constructor() {}

  ngOnInit(): void {}
}
