import 'package:shared_preferences/shared_preferences.dart';

class UserDetail {
  final String id;
  final String name;
  final double dynamoCoin;
  final String countryIcon;

  UserDetail({
    required this.id,
    required this.name,
    required this.dynamoCoin,
    required this.countryIcon,
  });

  factory UserDetail.fromSharedPreferences(SharedPreferences prefs) {
    return UserDetail(
      id: prefs.getString('userId') ?? '',
      name: prefs.getString('userName') ?? 'Anonymous',
      dynamoCoin: prefs.getDouble('dynamoCoin') ?? 0.0,
      countryIcon: prefs.getString('countryIcon') ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'dynamoCoin': dynamoCoin,
      'countryIcon': countryIcon,
    };
  }
}
