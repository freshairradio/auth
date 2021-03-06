import React from 'react'
import { freshairTheme } from './theme'
import {
  ThemeProvider,
  CSSReset,
  Heading,
  Button,
  Divider,
  Box,
  Avatar,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Stack,
  AvatarBadge,
  Editable,
  AspectRatioBox,
  EditableInput,
  EditablePreview,
  Text,
  FormControl,
  Image,
  FormLabel,
  FormErrorMessage,
  Collapse,
  Input,
  ButtonGroup,
  FormHelperText,
  Tab,
  Tag,
  TagIcon,
  TagLabel,
  TagCloseButton,
  Tabs,
  TabPanels,
  TabPanel,
  TabList,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  MenuOptionGroup,
  MenuItemOption
} from '@chakra-ui/core'
export const Card = ({ children, ...props }) => (
  <Box
    rounded="lg"
    backgroundColor={freshairTheme.colors.black}
    padding="20px"
    padding="20px"
    mb="20px"
    {...props}
  >
    {children}
  </Box>
)
