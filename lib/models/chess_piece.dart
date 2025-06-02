enum PieceColor { white, black }

enum PieceType { pawn, rook, knight, bishop, queen, king, missile }

class ChessPiece {
  final PieceColor color;
  final PieceType type;
  final int enPassantUsedCount;
  final bool justMovedThreeOrTwoSquares;

  ChessPiece(this.color, this.type)
      : enPassantUsedCount = 0,
        justMovedThreeOrTwoSquares = false;

  ChessPiece.withHistory({
    required this.color,
    required this.type,
    required this.enPassantUsedCount,
    required this.justMovedThreeOrTwoSquares,
  });

  String get symbol {
    final colorPrefix = color == PieceColor.white ? 'w' : 'b';
    final typeChar = type.toString().split('.').last[0];
    return '$colorPrefix$typeChar';
  }

  String get name {
    final colorName = color == PieceColor.white ? 'White' : 'Black';
    final typeName = type.toString().split('.').last;
    return '$colorName $typeName';
  }
}
