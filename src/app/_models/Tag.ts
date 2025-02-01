export class Tag {

  static readonly TYPESCRIPT = new Tag('TypeScript', 'darkred');
  static readonly JAVASCRIPT = new Tag('JavaScript', 'orange');
  static readonly JAVA = new Tag('Java', 'orange');
  static readonly GO = new Tag('Go', 'grey');
  static readonly PYTHON = new Tag('Python', 'pink');
  static readonly NODEJS = new Tag('Node.JS', 'brown');
  static readonly CSHARP = new Tag('C#', 'green');
  static readonly ASPNET = new Tag('ASP.NET', 'purple');

  static readonly ANGULAR = new Tag('Angular', 'red');
  static readonly REACT = new Tag('React', 'darkred');
  static readonly VUE = new Tag('VUE', 'crimson');
  static readonly SPRING = new Tag('Spring Boot', 'firebrick');
  static readonly DJANGO = new Tag('Django', 'darkgreen');

  private constructor(private readonly key: string, public readonly color: string) {}

  toString() {
    return this.key;
  }
}
