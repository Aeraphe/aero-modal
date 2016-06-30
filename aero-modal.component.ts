import {Component,Input,SimpleChange, OnChanges,Output,EventEmitter} from 'angular2/core';
import {IModal,IModalButtons} from './aero-modal.interface.component';

@Component({
    selector:'aero-modal',
    template:`\n\
<div *ngIf="showModal"  tabindex="-1" class="modal in"   id="{{modal.id}}"  style="display: block" >
  <div role="document" class="modal-dialog {{modal.size}}">
    <div class="modal-content">
      <div class="modal-header">
        <button (click)="showHideModal()" aria-label="Close" data-dismiss="modal" class="close" type="button">
          <span aria-hidden="true">×</span>
        </button>
        <h4 id="myModalLabel" class="modal-title">{{modal.title}}</h4>
      </div>
      <div class="modal-body">
        <ng-content></ng-content>
      </div>       
      <div class="modal-footer">
        <button  *ngFor="let btn of modalButtons" (click)="modalButtonAction(btn.action)" class="{{btn.cssClass}}" type="button">{{btn.name}}</button>   
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->

</div>`
})

export class AeroModalComponent implements OnChanges{
    
   @Input() public showModal:boolean=false;
   @Output() public closeModal= new EventEmitter<boolean>();
   @Output() public modalClickEvent = new EventEmitter<string>();
   @Input() public modal:IModal={id:'1',title:'Teste'};
   @Input() public modalButtons:Array<IModalButtons>=[{id:'btn-1',name:'Fechar',action:"closeModal",cssClass:'btn btn-primary'}];
    
   
     ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
       
    }
   
    /*
     * This methodo show and hide the modal
     * 
     */
    public showHideModal():void{
        
        this.showModal = !this.showModal;
        this.closeModal.emit(this.showModal);
        if (this.showModal){
        document.getElementById('speed-body').className='modal-open';
        }else{
            document.getElementById('speed-body').className='';
        }
    }
    
    /**
     * This method emit a event if the user click in some button on footer of the modal
     */
    public modalButtonAction(action:string):void{
        this.modalClickEvent.emit(action);
      
    }
    
}



