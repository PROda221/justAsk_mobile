import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../../Functions/StyleScale';
import {Typography} from '..';
import {colors} from '../../DesignTokens/Colors';
import {DropdownArrow} from '../../Assets/Images';

type DropdownItem = {
  label: string;
  value: string;
};

type DropdownProps = {
  items: DropdownItem[];
  label: string;
  onSelect: (value: string) => void;
};

export const Dropdown: React.FC<DropdownProps> = ({items, label, onSelect}) => {
  const [selectedItem, setSelectedItem] = useState<DropdownItem | undefined>(
    undefined,
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelect = (item: DropdownItem) => {
    setSelectedItem(item);
    onSelect(item.value);
    toggleDropdown();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownButton}>
        <View style={styles.labelContainer}>
          <Typography
            bgColor={colors.black}
            size={'medium'}
            fontWeight={'400'}
            textStyle={styles.dropDownButtonText}>
            {selectedItem ? selectedItem.label : label}
          </Typography>
          <DropdownArrow
            style={[
              styles.arrowIcon,
              {transform: [{rotate: isDropdownOpen ? '180deg' : '0deg'}]},
            ]}
          />
        </View>
      </TouchableOpacity>

      {isDropdownOpen && (
        <View style={styles.dropdownList}>
          {items.map(item => (
            <TouchableOpacity
              key={item.value}
              style={styles.dropdownItem}
              onPress={() => {
                handleSelect(item);
              }}>
              <Typography
                bgColor={colors.black}
                size={'medium'}
                fontWeight={'400'}
                textStyle={styles.dropDownButtonText}>
                {item.label}
              </Typography>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  arrowIcon: {
    marginRight: moderateScale(10),
  },
  container: {
    // Position: 'absolute',
    flex: 1,
    zIndex: 1,
  },

  dropDownButtonText: {fontFamily: "Arial", marginHorizontal: moderateScale(10), textAlign: 'left'},
  dropdownButton: {
    borderColor: colors.lightGrey,
    borderRadius: moderateScale(4),
    borderWidth: moderateScale(1),
    height: verticalScale(40),
    justifyContent: 'center',
    width: horizontalScale(220),
  },
  dropdownItem: {
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: moderateScale(1),
    height: verticalScale(40),
    paddingBottom: moderateScale(10),
    paddingTop: moderateScale(8),
    width: horizontalScale(220),
  },

  dropdownList: {
    backgroundColor: colors.white,
    borderColor: colors.white,
    borderRadius: moderateScale(5),
    borderWidth: moderateScale(1),
    marginHorizontal: moderateScale(10),
    position: 'absolute',
    width: horizontalScale(220),
    zIndex: 10000,

    // Position: 'absolute',
    // top: moderateScale(40),
  },
  labelContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
