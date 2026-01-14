import java.text.DecimalFormat;

public class funcionario {

    String nomefuncionario = " Marcelo Ramos";
    int idade = 26;
    Double salario = 3000.00; 
    boolean ativo = true;

    public static void main(String[] args) {
    funcionario aluno = new funcionario();
    aluno.exibirDados();
    
}
 void exibirDados() { 
    DecimalFormat df = new DecimalFormat("0.00");
    System.out.println("Nome do funcionario: " + this.nomefuncionario);
    System.out.println("Idade: " + this.idade);
    System.out.println("Salario: " + this.salario);
    System.out.println("Está ativo na empresa: " + this.ativo);
    
}

}
