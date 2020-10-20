
export class Impressora_fiscal {
  constructor(private modelo: string, 
    private ecf_if: string, private ecf: string, private serial: string){}

    private verificar_dados(){
      if(this.modelo == "" || this.modelo == null){
        throw new Error("É preciso informar o modelo da impressora");
      }

      if(this.ecf_if == "" || this.ecf_if == null){
        throw new Error("É preciso informar a versão do ECF-IF da impressora");
      }

      if(this.ecf == "" || this.ecf == null){
        throw new Error("É preciso informar a versão do ECF da impressora");
      }

      if(this.serial == "" || this.serial == null){
        throw new Error("É preciso informar o número serial da impressora");
      }
    }
    
    public dados_impressora(): string
    {
      this.verificar_dados();

      return `${this.modelo}
ECF-IF VERSÃO: ${this.ecf_if} ECF: ${this.ecf}
FAB: ${this.serial}`
    }
}
