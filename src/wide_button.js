import React from 'react'
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
import { freshairTheme } from './theme'
export const WideButton = ({ isLoading, onClick, children }) => (
  <Stack spacing={4} paddingTop="10px" isInline>
    <Button
      variantColor="orange"
      float="right"
      flexGrow="1"
      onClick={onClick}
      textTransform="lowercase"
      fontWeight="100"
      variant="solid"
      color="white"
      background={freshairTheme.colors.orange[500]}
      isLoading={isLoading}
    >
      {children}
    </Button>
  </Stack>
)
