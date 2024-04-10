export class PokemonUtil {
  private constructor() { }

  public static firstLetterUpperCase(value: string): string {
    return `${value[0].toUpperCase()}${value.substring(1, value.length)}`;
  }
}
